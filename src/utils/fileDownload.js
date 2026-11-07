/**
 * Tiện ích tải file (CSV, PDF, Text) thực tế dùng được ngay
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {}
  }, 4000);
}

export function downloadTextOrCsv(content, filename, mimeType = 'text/csv;charset=utf-8;') {
  // UTF-8 BOM to ensure Excel opens Vietnamese properly
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, content], { type: mimeType });
  downloadBlob(blob, filename);
}

/**
 * Tải file Catalogue PDF mẫu có đầy đủ thông tin chuẩn của Nhựa AMC
 */
export function downloadCataloguePdf(brandName = 'AMC') {
  const filename = `Catalogue_${brandName}_2026.pdf`;
  const pdfHeader = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> >>\nendobj\n4 0 obj\n<< /Length 200 >>\nstream\nBT\n/F1 18 Tf\n50 780 Td\n(NHUA AMC - CATALOGUE 2026 - TAM OP THAN TRE & GO NHUA) Tj\n/F1 12 Tf\n0 -30 Td\n(Nha may San xuat: CCN Kim Binh, Phu Van, Ninh Binh) Tj\n0 -20 Td\n(Hotline: 0325.999.238 - 0865.535.239) Tj\n0 -20 Td\n(Website: nhuaamc.vn - Chuan an toan Formaldehyde E0) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000300 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n550\n%%EOF`;
  const blob = new Blob([pdfHeader], { type: 'application/pdf' });
  downloadBlob(blob, filename);
}

export function downloadCertificatesPdf(brandName = 'AMC') {
  const filename = `Chung_Chi_Kiem_Dinh_${brandName}_2026.pdf`;
  const pdfHeader = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> >>\nendobj\n4 0 obj\n<< /Length 260 >>\nstream\nBT\n/F1 18 Tf\n50 780 Td\n(HO SO CHUNG CHI KIEM DINH CHAT LUONG - NHUA AMC) Tj\n/F1 12 Tf\n0 -30 Td\n(1. Chung nhan Phat thai Formaldehyde Dat Chuan E0 Chau Au) Tj\n0 -20 Td\n(2. Ket qua Thu nghiem Can lua Chong chay Lan Chuan B1 - Quatest 1) Tj\n0 -20 Td\n(3. Kiem dinh Keo Nhiet PUR Jowat Duc Chong Bong Roc) Tj\n0 -20 Td\n(Nha may AMC: CCN Kim Binh, Ninh Binh - Hotline: 0325.999.238) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000300 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n580\n%%EOF`;
  const blob = new Blob([pdfHeader], { type: 'application/pdf' });
  downloadBlob(blob, filename);
}

export function downloadGuidePdf(brandName = 'AMC') {
  const filename = `Huong_Dan_Thi_Cong_${brandName}_2026.pdf`;
  const pdfHeader = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> >>\nendobj\n4 0 obj\n<< /Length 260 >>\nstream\nBT\n/F1 18 Tf\n50 780 Td\n(HUONG DAN THI CONG & UON GOC 90 DO TAM OP THAN TRE AMC) Tj\n/F1 12 Tf\n0 -30 Td\n(Buoc 1: Kiem tra do phang cot tuong va lap dat he khung xuong) Tj\n0 -20 Td\n(Buoc 2: Soi ranh mat sau bang luoi phay V 90 do de uon cong lien mach) Tj\n0 -20 Td\n(Buoc 3: Bom keo PUR chuyen dung va co dinh bang nep nhom) Tj\n0 -20 Td\n(Ky thuat vien ho tro: 0325.999.238 - nha may Nhua AMC) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000300 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n580\n%%EOF`;
  const blob = new Blob([pdfHeader], { type: 'application/pdf' });
  downloadBlob(blob, filename);
}

/**
 * Tải bảng giá niêm yết dạng bảng tính CSV (Excel mở trực tiếp)
 */
export function downloadPriceTableCsv(brandName = 'AMC') {
  const filename = `Bang_Gia_Niem_Yet_${brandName}_2026.csv`;
  const rows = [
    ['BẢNG GIÁ NIÊM YẾT VẬT TƯ TẤM ỐP THAN TRE & PHỤ KIỆN', `NHÀ MÁY NHỰA ${brandName}`],
    ['Địa chỉ nhà máy', 'CCN Kim Bình, Phù Vân, Ninh Bình'],
    ['Hotline kinh doanh', '0325.999.238 - 0865.535.239'],
    ['Tiêu chuẩn', 'Chuẩn phát thải Formaldehyde E0 & Keo nhiệt PUR'],
    [''],
    ['STT', 'MÃ SẢN PHẨM', 'TÊN SẢN PHẨM / QUY CÁCH', 'ĐƠN VỊ TÍNH', 'ĐƠN GIÁ BÁN LẺ (ĐỒNG)', 'ĐƠN GIÁ ĐẠI LÝ (ĐỒNG)', 'GHI CHÚ'],
    ['1', 'EB-TT05-2440', 'Tấm ốp than tre 5mm x 1220 x 2440mm (Vân gỗ / Vân đá)', 'Tấm', '350.000', '280.000', 'Uốn cong 90 độ'],
    ['2', 'EB-TT05-2800', 'Tấm ốp than tre 5mm x 1220 x 2800mm (Vân gỗ / Vân đá)', 'Tấm', '405.000', '325.000', 'Khổ cao trần chung cư'],
    ['3', 'EB-TT08-2800', 'Tấm ốp than tre 8mm x 1220 x 2800mm (Dòng cao cấp)', 'Tấm', '520.000', '415.000', 'Cách âm, chống va đập'],
    ['4', 'EB-TT08-3200', 'Tấm ốp than tre 8mm x 1220 x 3200mm (Khổ vượt tầng)', 'Tấm', '640.000', '510.000', 'Biệt thự, sảnh lớn'],
    ['5', 'EB-TT17-2800', 'Tấm than tre 17mm chuyên tủ nội thất x 1220 x 2800mm', 'Tấm', '1.150.000', '920.000', 'Đóng cánh tủ, chịu lực cao'],
    ['6', 'LS-3S-150', 'Lam 3 sóng than tre cao 15mm x rộng 150mm x dài 3000mm', 'Thanh', '145.000', '115.000', 'Tạo điểm nhấn vách TV'],
    ['7', 'LS-4S-150', 'Lam 4 sóng than tre cao 15mm x rộng 150mm x dài 3000mm', 'Thanh', '145.000', '115.000', 'Tạo điểm nhấn đầu giường'],
    ['8', 'NEP-T15', 'Nẹp chữ T hợp kim nhôm bản 15mm (3000mm)', 'Thanh', '55.000', '42.000', 'Nẹp mạch nối phẳng'],
    ['9', 'NEP-V20', 'Nẹp góc ngoài V20 hợp kim nhôm (3000mm)', 'Thanh', '65.000', '48.000', 'Bo góc dương 90 độ'],
    ['10', 'NEP-LED', 'Nẹp nhôm định hình hắt LED gián tiếp kèm mica tản sáng (3000mm)', 'Thanh', '95.000', '72.000', 'Nẹp khe sáng trang trí'],
    ['11', 'KEO-PUR-600', 'Keo dán chuyên dụng ép nhiệt PUR tube 600ml', 'Chai', '85.000', '65.000', 'Chống bong tróc vĩnh viễn'],
    [''],
    ['LƯU Ý', 'Báo giá chưa bao gồm VAT và cước vận chuyển ngoại tỉnh. Đại lý dự án lớn vui lòng liên hệ trực tiếp hotline để nhận chiết khấu bổ sung.']
  ];

  const csvContent = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  downloadTextOrCsv(csvContent, filename);
}
