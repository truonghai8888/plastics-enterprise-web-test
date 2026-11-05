function runAutoDeleteWorkflow() {
  // Cú pháp tìm kiếm kết hợp toàn bộ điều kiện:
  // 1. Nhóm từ các địa chỉ cố định
  // 2. Nhóm từ tasks.clickup kèm từ khóa (changed status, Overdue, Status has been changed, Assigned)
  // 3. Nhóm từ tasks.clickup cũ hơn 100 ngày (older_than:100d)
  const query = 'from:(gitlab@tap-ic.co.jp OR notifications@clickup.com OR team@mail.clickup.com) OR (from:notifications@tasks.clickup.com ("changed status" OR "Overdue" OR "Status has been changed" OR "Assigned")) OR (from:notifications@tasks.clickup.com older_than:100d)';

  const BATCH_SIZE = 100;
  const startTime = new Date().getTime();
  const MAX_RUNTIME_MS = 4.5 * 60 * 1000; // Ngưỡng an toàn 4.5 phút để tránh giới hạn trần 6 phút

  const userProperties = PropertiesService.getUserProperties();

  // Lấy tổng số mail tích lũy qua các vòng lặp
  let grandTotal = parseInt(userProperties.getProperty('TOTAL_DELETED') || '0', 10);
  let deletedThisRun = 0;

  while (true) {
    // Kiểm tra thời gian: nếu chạm mốc 4.5 phút thì lưu lại tiến độ và hẹn chạy đợt kế tiếp
    if (new Date().getTime() - startTime > MAX_RUNTIME_MS) {
      userProperties.setProperty('TOTAL_DELETED', grandTotal.toString());
      Logger.log(`Đã chạm ngưỡng an toàn. Tổng tích lũy hiện tại: ${grandTotal}. Hẹn chạy tiếp sau 1 phút...`);
      scheduleNextBatch();
      return;
    }

    const threads = GmailApp.search(query, 0, BATCH_SIZE);

    // Không còn email nào thỏa điều kiện lọc
    if (!threads || threads.length === 0) {
      finishAndNotify(grandTotal);
      return;
    }

    // Đếm số lượng email thực tế trong đợt quét
    let currentBatchCount = 0;
    for (let i = 0; i < threads.length; i++) {
      currentBatchCount += threads[i].getMessageCount();
    }

    // Chuyển toàn bộ vào thùng rác
    GmailApp.moveThreadsToTrash(threads);
    deletedThisRun += currentBatchCount;
    grandTotal += currentBatchCount;

    Logger.log(`Đợt này đã xóa: ${deletedThisRun} | Tổng cộng dồn: ${grandTotal}`);

    // Nếu lấy về ít hơn BATCH_SIZE tức là đã dọn đến mail cuối cùng
    if (threads.length < BATCH_SIZE) {
      finishAndNotify(grandTotal);
      return;
    }
  }
}

// Gửi mail báo cáo tổng kết và xóa bỏ trigger tự động
function finishAndNotify(totalCount) {
  Logger.log(`=== HOÀN TẤT TOÀN BỘ: Đã xóa tổng cộng ${totalCount} email! ===`);

  const myEmail = Session.getActiveUser().getEmail();
  const subject = '[Thông báo] Đã hoàn tất tự động dọn dẹp email ClickUp & GitLab';
  const body = `Chào bạn,\n\nQuá trình dọn dẹp tự động đã hoàn tất thành công.\n\n- Tổng số email đã chuyển vào Thùng rác: ${totalCount}\n- Thời gian hoàn tất: ${new Date().toLocaleString('vi-VN')}\n\nTất cả các tiến trình hẹn giờ tự động đã được gỡ bỏ an toàn.`;

  GmailApp.sendEmail(myEmail, subject, body);
  Logger.log(`Đã gửi email báo cáo tới: ${myEmail}`);

  // Dọn dẹp bộ nhớ đệm và trigger
  PropertiesService.getUserProperties().deleteProperty('TOTAL_DELETED');
  clearAutoTriggers();
}

// Tự động lên lịch chạy tiếp sau 1 phút
function scheduleNextBatch() {
  clearAutoTriggers();
  ScriptApp.newTrigger('runAutoDeleteWorkflow')
    .timeBased()
    .after(60 * 1000)
    .create();
  Logger.log("Đã tạo trigger chạy tiếp theo sau 1 phút.");
}

// Gỡ bỏ trigger tự động tránh chạy chồng chéo
function clearAutoTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'runAutoDeleteWorkflow') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}
