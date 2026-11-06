/* Eco Bamboo — UI */
(function () {
  'use strict';

  /* Header shadow on scroll */
  var hdr = document.getElementById('hdr');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (hdr) hdr.classList.toggle('scrolled', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 620);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Drawer */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var closeBtn = document.getElementById('closeDrawer');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (scrim) scrim.classList.toggle('open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('open')); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Đo sự kiện ----------------------------------------------------------
     Một cửa duy nhất để bắn sự kiện, và nó IM LẶNG khi chưa gắn thẻ đo nào.
     Nhờ vậy mọi chỗ trong tệp cứ gọi ebDo(...) tự nhiên, không phải bọc if.
     KHÔNG bao giờ đưa tên hay số điện thoại vào đây — sang bên thứ ba là dữ liệu
     cá nhân, mà cũng chẳng dùng được vào việc gì. */
  function ebDo(ten, chi_tiet) {
    /* MỘT CỬA DUY NHẤT ĐẨY SỰ KIỆN, và nó chỉ đẩy vào `dataLayer`.

       ⚠⚠ ĐÃ GỠ mọi lời gọi `gtag()` và `fbq()` thẳng ở đây (30/08/2026, luật D1 của
       TGĐ: một container, không hơn). GA4, Google Ads và Meta Pixel nay là THẺ BÊN
       TRONG container GTM-K4GV2ZPV.

       Vì sao phải gỡ chứ không để lẫn: khi container nạp thẻ GA4, nó tự khai
       `window.gtag` trên trang. Nhánh cũ ở đây thấy `window.gtag` có thật sẽ bắn
       thêm một lần nữa — mỗi sự kiện thành HAI. Số liệu vẫn hợp lý khi nhìn, chỉ sai
       gấp đôi. Đúng họ với ca "GTM nạp hai lần" trong bộ kiểm.

       ⚠ ĐO LẠI CHÍNH CONTAINER ĐANG CHẠY, 31/08/2026 (tải `gtm.js?id=GTM-K4GV2ZPV`
       rồi đọc bảng `tags` + `predicates`/`rules`). Đây là hiện trạng THẬT, không
       phải suy từ mã nguồn trang:
         · `lead_gui`      -> Ads `NfQsCMWyy-oc…`  +  Meta `Lead`          ✓
         · bấm `tel:`      -> Ads `MybaCOKfp8oZ…`  +  Meta `Contact`       ✓
         · bấm `zalo.me`   -> Ads `3SenCPSQp8oZ…`  +  Meta `Contact`       ✓
         · mọi trang       -> Meta `PageView` · GA4 config `G-DDFGCGRJMK`  ✓
         · `/san-pham-chinh/` -> Meta `ViewContent`                        ✓

       ✅ ĐÃ BỊT — GTM v10, trực tiếp 06:01 ngày 06/09/2026. Sáu sự kiện nay có thẻ
       GA4; `bam_goi`/`bam_zalo` đi qua thẻ `lien_he_dien_thoai`/`lien_he_zalo` kèm
       `vi_tri`. `tinh_chi_phi_xong` kèm `nhom` · `tai_tai_lieu` kèm `tai_lieu` ·
       `xuat_du_toan` kèm `dang` · `mo_hop_chiet_khau` không tham số.

       ⚠⚠ SÁU TÊN SỰ KIỆN VÀ BỐN THAM SỐ TRÊN NAY LÀ HỢP ĐỒNG VỚI GTM VÀ GA4 —
       `vi_tri` · `nhom` · `tai_lieu` · `dang` đã đăng ký làm thứ nguyên tuỳ chỉnh.
       Đổi tên là mất thẻ, và mất **trong im lặng**: `dataLayer` vẫn nhận, bản dựng
       vẫn xanh, GA4 chỉ đơn giản không có số. Muốn đổi thì phải đổi trong GTM trước.

       ─── LỊCH SỬ, đúng tới 05/09/2026, giữ lại để hiểu vì sao GA4 trống trước 06/09 ───
       ⚠⚠ CÒN ĐÚNG MỘT LỖ, VÀ NÓ IM LẶNG: container KHÔNG có thẻ nào loại `__gaawe`
       (thẻ SỰ KIỆN GA4) — đo được 0/14 thẻ. Nên GA4 chỉ nhận những gì thẻ cấu hình
       tự bắn: `page_view` và nhóm "đo lường nâng cao". Các sự kiện của trang này vào
       tới `dataLayer`, GTM nhận, rồi KHÔNG THẺ NÀO NGHE. `lead_gui` may hơn: nó có
       trình kích hoạt, nhưng chỉ chạy sang Ads và Meta, KHÔNG sang GA4.
       ⇒ Đừng đi tìm `generate_lead` trong GA4 và kết luận website hỏng. Website đang
       bắn đúng; thứ còn thiếu là một thẻ sự kiện GA4, và nó phải khai trong GTM.

       ⚠ Đoạn lịch sử trên từng kê BỐN sự kiện mất. Đếm trong mã ngày 06/09 ra SÁU —
       thiếu `xuat_du_toan` và `mo_hop_chiet_khau`, cả hai nằm ở `tinh-chi-phi.js`.
       Con số cũ lấy từ một ghi chú thay vì đếm ở nguồn. Đếm lại bằng:
           grep -rho "ebDo('[a-z_]*'" assets/js/*.js | sort -u

       ⚠ KHÔNG BAO GIỜ ĐẨY THÔNG TIN KHÁCH vào đây — tên, số điện thoại, email, nội
       dung khách gõ. Vừa là điều khoản của Google (đẩy dữ liệu cá nhân vào Analytics
       có thể bị khoá tài khoản), vừa là luật đứng của TGĐ. Chỉ loại hộp và đường dẫn.
       `location.pathname` cố ý KHÔNG kèm chuỗi truy vấn. */
    var d = chi_tiet || {};
    d.trang = ebDuongDan();
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ten }, d)); } catch (e) { }
  }

  /* Ba giá trị `loai_form` TGĐ chốt 30/08/2026 — đúng ba giá trị này, không hơn.
     Website có nhiều mã `loai` hơn (ba mã nhu cầu từ `?nc=` của hộp chiết khấu), nên
     phải nắn về, chứ không đẩy nguyên mã ra dataLayer.
     ⚠ NẮN Ở ĐÂY, KHÔNG ĐỔI `data-loai`. `data-loai` là thứ gửi sang App làm `hop` —
     bên đó cần phân biệt "thợ xin bảng giá" với "chủ nhà xin giới thiệu đội thợ".
     Gộp chúng lại ở nguồn để cho gọn dataLayer là làm mất phân biệt ấy ở CẢ HAI nơi.
     Hai đường, hai độ mịn, cùng một sự thật. */
  /* CHUẨN HOÁ ĐƯỜNG DẪN — bỏ dấu gạch cuối, đúng dạng chuẩn của cả site
     (`chrome.duong_dan()`, xem CLAUDE.md "Dạng đường dẫn chuẩn").

     ⚠ MỘT HÀM DÙNG CHUNG CHO BA CHỖ: `trang` gửi sang App · `trang_dau` gửi sang App ·
     `trang` đẩy vào dataLayer. Bản 01/09 chỉ chuẩn hoá chỗ thứ ba, nên GA4 gộp đúng
     còn cột `trang` bên App vẫn tách `/lien-he` với `/lien-he/` — sửa một nửa thì
     trông y hệt sửa xong. Ba chỗ chép tay ba lần là kiểu hỏng đã ghi nhiều lần.

     Giữ nguyên `/` của trang chủ: bỏ gạch ở đó thì còn chuỗi rỗng.
     KHÔNG kèm chuỗi truy vấn — `?ma=` và `?nc=` là hành vi của khách, không phải
     danh tính của trang. */
  function ebDuongDan(p) {
    p = p || location.pathname;
    return p.length > 1 ? p.replace(/\/+$/, '') : p;
  }

  var EB_LOAI_FORM = {
    baogia: 'bao_gia', tho_dai_ly: 'bao_gia',
    mau: 'mau',
    dai_ly_npp: 'dai_ly',
    tailieu: 'tai_lieu',
    /* ⚠ Trang đích quảng cáo C2 (21/09/2026). Nhãn thô gửi GA4 là `tu_van` — đúng
       mức ý định của một lượt bấm quảng cáo đọc bài rồi để lại số, KHÔNG phải
       `bao_gia`. Thiếu khoá này thì nó rơi vào nhánh dự phòng `khong_ro`. */
    bai_dich: 'tu_van',
    tu_van_le: 'tu_van', gioi_thieu_tho: 'tu_van'
  };
  function ebLoaiForm(loai) {
    /* ⚠ NHÁNH DỰ PHÒNG TRẢ `khong_ro`, KHÔNG TRẢ `tu_van` (TGĐ chốt 01/09/2026).
       Bản cũ trả `tu_van` — nhãn rẻ nhất, nên nó không thổi phồng chất lượng lead;
       nhưng nó cũng LÀM MÃ LẠ LẨN MẤT. Đã xảy ra thật: `dai_ly_npp` thêm ngày
       31/08 vào `EB_NHU_CAU` mà quên thêm vào bảng này, nên lead đại lý — mức ý
       định CAO NHẤT trên site — bị báo cáo giống hệt một cú bấm tải PDF, suốt
       nhiều ngày, không một dấu hiệu nào.
       `khong_ro` vẫn là nhãn rẻ nhất (Ads không có cớ đấu thầu về phía nó) nhưng
       nó TỰ HIỆN RA trong GA4. Hàng rào `kiem_nhan_form()` bên `all.py` mới là thứ
       chặn tận gốc; nhãn này là lưới cuối, phòng khi có đường vào mà hàng rào chưa
       biết. Thấy `khong_ro` trong báo cáo nghĩa là có một đường như thế. */
    return EB_LOAI_FORM[loai] || 'khong_ro';
  }

  /* Chỗ đứng của nút được bấm — GTM cần biết nút gọi nào đang hiệu quả.
     Đọc từ TỔ TIÊN trong cây chứ không đọc `className` của chính thẻ <a>: cùng một nút
     "Gọi tư vấn" có class khác nhau ở header, thanh dưới cùng và cuối bài, nên lấy
     class ra thì ba chỗ thành ba tên rời rạc không gộp lại được. */
  /* Vị trí của một nút gọi / Zalo, gửi kèm sự kiện `bam_goi` · `bam_zalo`.
     Không có nó thì báo cáo chỉ nói "có người bấm gọi", không nói bấm ở đâu — mà chỗ
     bấm mới là thứ quyết định nên sửa gì.

     ⚠ THỨ TỰ CÁC DÒNG LÀ THỨ TỰ ƯU TIÊN, đừng xếp lại cho gọn mắt. `.topbar` nằm
     trong `.hdr`, `.cta-band` nằm trong một `section` bình thường — đổi thứ tự là đổi
     nhãn của những nút đang chạy, và số liệu cũ mới thành hai nhóm khác nhau mang
     cùng một tên.

     ⚠ SÁU NHÃN DƯỚI CÙNG THÊM 31/08/2026. Bản rà soát ghi "đang trả `khac` cho cả 6
     chỗ" — ĐO LẠI THÌ KHÔNG PHẢI: sáu nhãn cũ vẫn chạy đúng, chỉ còn 2–4 nút mỗi
     trang rơi vào `khac`. Đã dò từng nút để biết chúng ở đâu rồi mới đặt tên, chứ
     không đoán:
        .topbar-r        số điện thoại ở thanh trên cùng
        aside.drawer     nút gọi trong ngăn kéo menu di động
        .cta-band        dòng "Hoặc gọi …" dưới dải kêu gọi cuối trang
        .bg-green        dải đóng trang chủ
        .contact-list    danh sách liên hệ ở /lien-he
        .mxh             cụm mạng xã hội
        .note-ck         ghi chú chiết khấu trên trang mã màu
     `khac` GIỮ LẠI làm lưới cuối — nó là dấu hiệu có nút mới sinh ra ở chỗ chưa ai
     đặt tên, chứ không phải mã chết. */
  function ebViTri(a) {
    if (a.closest('.topbar')) return 'thanh-tren';
    if (a.closest('.drawer')) return 'ngan-keo';
    if (a.closest('.hdr')) return 'header';
    if (a.closest('.mbar')) return 'thanh-duoi';
    if (a.closest('.bai-lienhe')) return 'cuoi-bai';
    if (a.closest('.ft')) return 'chan-trang';
    if (a.closest('.tc-modal')) return 'hop-chiet-khau';
    if (a.closest('.cta-band')) return 'dai-cta';
    if (a.closest('.note-ck')) return 'ghi-chu-gia';
    if (a.closest('.contact-list') || a.closest('.mxh')) return 'khoi-lien-he';
    if (a.closest('.bg-green')) return 'dai-dong-trang';
    if (a.closest('article')) return 'trong-bai';
    return 'khac';
  }

  window.ebDo = ebDo;   // tinh-chi-phi.js dùng chung

  /* ⚠ `ViewContent` của Meta ĐÃ GỠ KHỎI ĐÂY (30/08/2026) — nay là một thẻ trong GTM.
     Ghi lại đặc tả để người khai thẻ chép đúng, vì nó CHÉP TỪ SITE CŨ chứ không phải
     tự nghĩ ra: container cũ GTM-K4GV2ZPV bắn khi `gtm.js` (tải trang) VÀ Page URL
     CHỨA `https://ecobamboo.vn/san-pham-chinh/tam-op-than-tre` — chỉ trang dòng sản
     phẩm tấm ốp, KHÔNG phải mọi trang mã. Ba tham số giữ nguyên từng chữ, kể cả
     'San Pham' không dấu:
         content_name = document.title · content_category = 'San Pham'
         content_type = 'product'
     Mở rộng phạm vi ra `/san-pham/` cho "hợp lý hơn" là ĐỔI PHÉP ĐO — mà đổi phép đo
     cùng lúc với đổi website thì về sau không quy được nguyên nhân cho con số nào. */

  /* Nguồn khách (utm) giữ trong phiên để gửi kèm khi họ để lại liên hệ ở trang khác:
     người bấm quảng cáo vào trang chủ rồi mới điền form ở trang liên hệ thì utm đã
     rụng khỏi URL từ lâu — không giữ lại thì mọi khách đều thành "vào thẳng". */
  var UTM_KEY = 'eb_utm';
  /* SÁU THAM SỐ App ĐÃ TẠO CỘT RIÊNG cho, cộng `utm_term`.
     ⚠ Danh sách khai MỘT CHỖ và cả hai chỗ dùng đều đọc nó. Chép tay ra hai bản là
     kiểu hỏng đã ghi nhiều lần trong CLAUDE.md (`CAN_RPC`, `NGUON_SEO`): thêm một
     tham số ở chỗ này mà quên chỗ kia thì nó lặng lẽ không bao giờ tới App. */
  var UTM_TS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
                'gclid', 'fbclid', 'wbraid', 'gbraid'];
  /* ⚠ `wbraid` và `gbraid` thêm 04/09/2026 — Google trả HAI tham số này THAY CHO
     `gclid` với lượt bấm từ iOS (khi người dùng không cho theo dõi). Thiếu chúng là
     mất trắng một mảng khách iPhone, mà đó lại là mảng lớn nhất ở thị trường này.
     Đây là chỗ hay bị quên nhất vì `gclid` vẫn có mặt trên desktop nên nhìn qua thấy
     ống vẫn chạy. */
  var BRAID = ['wbraid', 'gbraid'];
  /* ⚠⚠ KHAI BÁO Ở ĐÂY, TRƯỚC KHỐI BẮT THẺ — KHÔNG PHẢI cạnh `ebLuu()`.
     Bản đầu tôi đặt `var _NHO = null;` ngay trên `ebLuu()`, tức SAU khối bắt thẻ
     trong tệp. `var` được hoisted nhưng PHÉP GÁN thì chạy đúng chỗ nó đứng, nên
     trình tự thành: khối bắt thẻ gọi `ebLuu()` và cất bộ thẻ vào `_NHO` → vài dòng
     sau `_NHO = null` chạy và XOÁ sạch. Đo ra vẫn rỗng y như chưa sửa gì, và đọc mã
     thì thấy hoàn toàn hợp lý — chỉ lộ khi chạy thật với kho bị chặn. */
  var _NHO = null;

  /* HẠN GIỮ — 90 ngày (TGĐ chốt 04/09/2026). */
  var UTM_HAN = 90 * 24 * 3600 * 1000;
  /* ⚠⚠ LUẬT GHI ĐÈ ĐÃ ĐẢO NGÀY 04/09/2026 — TGĐ chốt lại, ghi rõ cả hai vế:
         lượt vào CÓ thẻ    -> GHI ĐÈ bộ thẻ đang giữ
         lượt vào KHÔNG thẻ -> GIỮ NGUYÊN bộ cũ, tuyệt đối không xoá

     Bản 31/08–03/09 chạy NGƯỢC VẾ ĐẦU: "nguồn đầu tiên có gắn thẻ thắng", tức thẻ
     tới sau không đè được. Nay theo lệnh mới thì thẻ sau thắng (lần chạm cuối) —
     cùng lối Google Analytics dùng. Ai đọc lại lịch sử đừng tưởng đây là lỗi hồi quy;
     đây là một quyết định bị đảo, có chủ ý, và vế THỨ HAI mới là vế TGĐ nhấn mạnh.

     ⚠ VẾ THỨ HAI LÀ VẾ QUAN TRỌNG HƠN, và nó là chỗ dễ viết hỏng nhất: khách bấm
     quảng cáo hôm nay, BA NGÀY SAU gõ thẳng ecobamboo.vn rồi mới điền form. Lượt vào
     trực tiếp đó KHÔNG được xoá bộ thẻ cũ — xoá là quảng cáo mất công ghi nhận, và
     số liệu nói dối theo hướng "khách tự tìm đến". Đó là hướng nguy hiểm nhất, vì nó
     khiến người đọc kết luận không cần chạy quảng cáo. */
  (function () {
    try {
      var q = new URLSearchParams(location.search), co = {};
      UTM_TS.forEach(function (k) { if (q.get(k)) co[k] = q.get(k).slice(0, 200); });
      var cu = ebUtmObj();
      var coThe = Object.keys(co).length > 0;
      if (coThe) {
        /* Lượt vào CÓ thẻ: thay CẢ BỘ thẻ, không trộn nửa cũ nửa mới. Trộn thì một
           chiến dịch mới thiếu `utm_content` sẽ đi kèm `utm_content` của chiến dịch
           cũ — một dòng dữ liệu không tương ứng với lượt bấm nào có thật. */
        UTM_TS.forEach(function (k) { delete cu[k]; });
        UTM_TS.forEach(function (k) { if (co[k]) cu[k] = co[k]; });
        /* Trang đích và referrer của CHÍNH lượt bấm này — chúng thuộc về bộ thẻ vừa
           ghi, nên phải làm mới cùng nhau, nếu không `trang_dau` sẽ nói về một lượt
           vào khác với `utm_campaign` bên cạnh nó. */
        cu.trang_dau = ebDuongDan();
        cu.luc_vao = ebLucVN();
        cu.ref = (document.referrer && document.referrer.indexOf(location.host) < 0)
          ? document.referrer.slice(0, 300) : '';
        cu.ghi_luc = Date.now();
      } else {
        /* Lượt vào KHÔNG thẻ: chỉ ĐIỀN CHỖ TRỐNG, không đụng gì đã có. Nhờ vậy khách
           tự nhiên vẫn có `trang_dau` (đã chứng minh giá trị: dòng id=32 vào từ tìm
           kiếm, rơi xuống một trang mã màu — biết được điều đó là nhờ trường này). */
        if (!cu.trang_dau) cu.trang_dau = ebDuongDan();
        if (!cu.luc_vao) cu.luc_vao = ebLucVN();
        if (!cu.ref && document.referrer &&
            document.referrer.indexOf(location.host) < 0) {
          cu.ref = document.referrer.slice(0, 300);
        }
        if (!cu.ghi_luc) cu.ghi_luc = Date.now();
      }
      ebLuu(cu);
    } catch (e) { }
  })();

  /* ⚠ GIỮ 90 NGÀY, KHÔNG CÒN THEO PHIÊN. `sessionStorage` chết khi đóng tab, nên
     khách bấm quảng cáo hôm nay rồi quay lại sau vài ngày là mất sạch thẻ — đúng ca
     3 trong phép nghiệm thu 04/09, và là hành vi mua hàng bình thường với một món
     vật liệu người ta phải cân nhắc.

     ⚠ CÙNG MỘT KHOÁ `eb_utm` cho cả hai kho, và ĐỌC sessionStorage trước khi bỏ nó:
     lúc bản này lên sóng, những khách đang mở dở một phiên vẫn còn sổ cũ ở đó. Không
     chuyển thì họ mất thẻ ngay giữa chừng — mất một lead thật để đổi lấy vài dòng gọn.

     ⚠ localStorage NÉM LỖI ở chế độ riêng tư của vài trình duyệt, nên mọi lần đọc và
     ghi đều phải bọc, và có đường lùi về sessionStorage. Không có đường lùi thì cả
     biểu mẫu hỏng theo, chứ không chỉ mất thẻ. */
  /* ⚠⚠ BẢN SAO TRONG BỘ NHỚ — đường lùi cuối khi trình duyệt CHẶN cả hai kho.
     Đo 05/09/2026 trên chính trang sống: chặn `localStorage` và `sessionStorage` rồi
     vào `/lien-he?utm_source=…&gclid=…` và nộp form NGAY trên trang đó —

         utm_source ""   utm_medium ""   gclid ""   luc_vao ""   trang_dau ""

     Mất sạch, dù tham số nằm ngay trên URL của chính trang đang mở. Ca này KHÔNG hiếm:
     trình duyệt trong ứng dụng Facebook / Messenger và chế độ riêng tư đều có thể
     chặn, mà đó lại là nơi phần lớn khách của Eco Bamboo đi vào.

     Biến này sống theo VÒNG ĐỜI CỦA TRANG, nên nó chỉ cứu được lượt xem hiện tại —
     đúng ca "vào trang đích rồi nộp form ngay tại đó", tức ca của quảng cáo dẫn thẳng
     vào trang có biểu mẫu. Đi qua trang khác thì vẫn phải có kho, không có cách nào
     khác. Cứu được một ca vẫn hơn mất cả hai. */
  function ebLuu(o) {
    _NHO = o;                                   // luôn giữ bản trong bộ nhớ trước
    var s = JSON.stringify(o);
    try { localStorage.setItem(UTM_KEY, s); return; } catch (e) { }
    try { sessionStorage.setItem(UTM_KEY, s); } catch (e) { }
  }
  /* Trả về OBJECT. ⚠ Đọc được cả sổ CŨ dạng chuỗi `a=1&b=2`: khách đang mở dở một
     phiên lúc bản mới lên sóng vẫn còn sổ cũ trong sessionStorage, và nếu hàm này
     ném lỗi ở đó thì FORM CỦA HỌ HỎNG — mất một lead thật để đổi lấy vài dòng gọn. */
  function ebUtmObj() {
    var s = '';
    /* localStorage TRƯỚC (kho chính, 90 ngày), sessionStorage SAU (sổ của phiên đang
       mở dở lúc bản này lên sóng, và là đường lùi khi localStorage bị chặn). */
    try { s = localStorage.getItem(UTM_KEY) || ''; } catch (e) { }
    if (!s) { try { s = sessionStorage.getItem(UTM_KEY) || ''; } catch (e) { } }
    /* Cả hai kho im lặng hoặc ném lỗi -> dùng bản trong bộ nhớ của chính lượt xem này.
       Trả `{}` ở đây là vứt đi bộ thẻ vừa đọc được từ URL cách đó vài trăm mili giây. */
    if (!s) return _NHO ? _NHO : {};
    var o;
    try {
      o = s.charAt(0) === '{' ? JSON.parse(s) : (function () {
        var r = {};
        s.split('&').forEach(function (x) {
          var i = x.indexOf('='); if (i > 0) r[x.slice(0, i)] = x.slice(i + 1);
        });
        return r;
      })();
    } catch (e) { return {}; }
    /* HẾT HẠN 90 NGÀY -> coi như chưa có gì. Sổ cũ không mang `ghi_luc` (bản trước
       04/09) thì KHÔNG vứt: nó là sổ của phiên đang mở, mới tinh theo định nghĩa. */
    if (o.ghi_luc && (Date.now() - o.ghi_luc) > UTM_HAN) return {};
    return o;
  }
  /* Bản CHUỖI, giữ nguyên để không làm hỏng bên nhận đang đọc `data.utm`. Đổi kiểu
     một trường đang chạy là thứ chỉ lộ ra ở bảng lead, sau khi đã mất mấy ngày dữ
     liệu. Gửi CẢ HAI thì bên App chuyển sang cột riêng lúc nào cũng được. */
  function ebUtm() {
    /* ⚠ CHỈ các tham số UTM, không đổ cả sổ ra. Sổ nay còn chở `trang_dau` và `ref`,
       mà hai thứ đó đã có trường riêng — nhét thêm vào chuỗi gộp là gửi cùng một giá
       trị bằng hai đường, rồi bên App phải chọn tin đường nào. */
    var o = ebUtmObj(), r = [];
    UTM_TS.forEach(function (k) { if (o[k]) r.push(k + '=' + o[k]); });
    return r.join('&');
  }
  function ebTb() { return (window.innerWidth < 720 ? 'dien-thoai' : 'may-tinh'); }

  /* Giờ Hà Nội, KHÔNG phải giờ máy khách. Máy khách có thể đặt múi giờ bất kỳ (và
     máy ảo hay để UTC), nên lấy giờ địa phương là ghi một mốc không so được với bất
     cứ mốc nào bên App — vốn tính theo giờ VN. Cùng lý do `hom_nay_hn()` bên
     `nhap_bai.py` phải tự cộng bù thay vì tin đồng hồ máy dựng. */
  function ebLucVN() {
    return new Date(Date.now() + 7 * 3600 * 1000).toISOString().replace('Z', '+07:00');
  }

  /* GẮN NGUỒN KHÁCH VÀO GÓI TIN — LUÔN GỬI ĐỦ TRƯỜNG, RỖNG THÌ GỬI RỖNG.
     (TGĐ chốt 03/09/2026, mục A2.)

     ⚠⚠ ĐÂY LÀ THAY ĐỔI NGƯỢC VỚI BẢN CŨ, và lý do đáng ghi: bản cũ viết
     `if (o[k]) data[k] = o[k]` nên trường rỗng bị **bỏ hẳn khỏi gói tin**. Bên nhận
     vì thế không phân biệt được hai chuyện khác hẳn nhau:

         không có trường   ->  website CHƯA GẮN         (không đo được)
         có trường, rỗng   ->  khách tự nhiên           (đo được, và là số thật)

     Gộp hai thứ đó làm một là đúng cái bệnh cả kho này đi chữa: biến "KHÔNG BIẾT"
     thành một câu trả lời trông như đã biết. Nay luôn gửi đủ 10 trường.

     ⚠ MỘT HÀM CHO CẢ HAI CHỖ GỬI (biểu mẫu và cổng tải). Trước đó là hai khối chép
     tay giống hệt nhau — thêm một trường ở chỗ này mà quên chỗ kia thì cổng tải lặng
     lẽ gửi thiếu, và không gì báo. */
  function ebGanNguon(data) {
    /* ══⚠⚠ §12 mục 4 — CỜ LEAD CHẠY THỬ. Bật bằng `?chaythu=1` trên URL.
       Trước bản này không đường nào đặt nó, nên một "lead thử" theo §12 sẽ vào bảng
       `web_lead` thành **lead thật** và người sau phải đi dọn tay — mà một dòng lead
       giả lẫn trong báo cáo thì làm hỏng đúng phép đo nó phục vụ (đã có tiền lệ: 13/18
       dòng 30 ngày là dòng chạy thử, khiến "tỷ lệ có utm_source" thành con số vô nghĩa).
       ⚠ Đặt Ở ĐÂY, trong hàm gắn nguồn dùng chung, nên MỌI biểu mẫu và cổng tải đều
         mang cờ — không phải nhớ gắn ở từng chỗ.
       ⚠ Đọc `location.search` mỗi lần gọi, không nhớ vào biến: link chạy thử được dán
         đi dán lại, và một cờ bật rồi nằm lại là đúng cái bẫy đã ghi nhiều lần. */
    if (/(?:^|[?&])chaythu=1(?:&|$)/.test(location.search)) data.la_chay_thu = true;
    var o = ebUtmObj();
    UTM_TS.forEach(function (k) { data[k] = o[k] || ''; });
    data.ref = o.ref || '';              // referrer THÔ — App tự suy kênh, mình không suy
    data.trang_dau = o.trang_dau || '';  // trang khách VÀO, khác `trang` là nơi đặt form
    data.luc_vao = o.luc_vao || '';      // thời điểm vào, giờ VN
    /* `wbraid`/`gbraid` đi bằng KHOÁ CỦA CHÍNH NÓ — dòng `UTM_TS.forEach` ở trên đã
       gửi rồi, không cần làm gì thêm ở đây.

       ⚠ GỠ MIẾNG VÁ 06/09/2026. Từ 04/09 chỗ này nhét một trong hai vào `gclid` kèm
       tiền tố (`wbraid:XXX`) khi `gclid` rỗng, vì bên App CHƯA CÓ CỘT. Đo lại ngày
       06/09 trên chính bảng `web_lead`: cột `wbraid` và `gbraid` ĐÃ CÓ (text,
       nullable), và `gclid LIKE 'wbraid:%'` ra **0 dòng**. Điều kiện sinh ra miếng vá
       đã hết, nên miếng vá phải đi theo.

       ⚠ Vì sao không giữ lại "cho chắc": một giá trị KHÔNG PHẢI gclid nằm trong cột
       `gclid` phá đúng thứ Google cần để đối chiếu chuyển đổi — mà cột đó là thứ mở
       cổng tài khoản Ads. Và nó hỏng hai lần cùng lúc: giá trị nấp trong `gclid` thì
       cột `wbraid` ở ngay cạnh lại rỗng, nên bên App nhìn vào tưởng chưa có lượt bấm
       iOS nào. Hôm nay chưa hỏng chỉ vì `wbraid` mới có 0 dòng — tức là quả bom hẹn
       giờ, và 0 dòng nhiễm nghĩa là NAY là lúc gỡ rẻ nhất, gỡ sau còn phải dọn dữ liệu.

       ⚠ Chú thích cũ ở đây có một câu SAI, ghi lại để không ai suy tiếp từ nó: "ngày
       App thêm cột thì bên web không phải sửa gì". Hai trường thô thì đúng là chảy
       sẵn, nhưng phần NHÉT vẫn chạy — nên vẫn phải sửa, và nếu tin câu đó thì không
       ai đi sửa. `BRAID` giữ lại vì `ebUtmObj()` còn dùng để bắt tham số từ URL. */
    return data;
  }

  /* Bấm gọi và bấm Zalo: đo bằng bắt sự kiện nổi bọt trên cả trang, không phải gắn
     tay từng nút — nút gọi nằm ở header, chân trang, thanh dưới cùng, trong bài viết
     và trong công cụ tính; gắn tay thì chắc chắn sót chỗ. */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) ebDo('bam_goi', { vi_tri: ebViTri(a) });
    else if (h.indexOf('zalo.me') >= 0) ebDo('bam_zalo', { vi_tri: ebViTri(a) });
  }, true);

  /* ---- Biểu mẫu liên hệ ---- */
  document.querySelectorAll('form[data-eb-form]').forEach(function (f) {
    var msg = f.querySelector('.fmsg');
    var btn = f.querySelector('button[type=submit]');
    function say(t, ok) {
      if (!msg) return;
      msg.hidden = false;
      msg.textContent = t;
      msg.className = 'fmsg ' + (ok ? 'ok' : 'err');
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f.querySelector('[name=website]') && f.querySelector('[name=website]').value) return;
      var ten = (f.ten.value || '').trim();
      var sdt = (f.sdt.value || '').trim();
      if (ten.length < 2) { say('Vui lòng nhập họ tên.', false); f.ten.focus(); return; }
      if (!/^[0-9+\s.()-]{9,15}$/.test(sdt)) { say('Số điện thoại chưa đúng định dạng.', false); f.sdt.focus(); return; }

      var ep = f.getAttribute('data-endpoint') || '';
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k !== 'website') data[k] = v; });
      data.loai = f.getAttribute('data-loai') || '';
      data.trang = ebDuongDan();
      data.token = f.getAttribute('data-token') || '';
      data.utm = ebUtm();
      // Và TỪNG THAM SỐ MỘT — chuỗi gộp `utm` ở trên thì bên App phải tự tách, mà
      // tách chuỗi là chỗ sinh lỗi im lặng. `ebGanNguon()` LUÔN gửi đủ 10 trường.
      ebGanNguon(data);
      data.tb = ebTb();

      if (!ep) {
        say('Biểu mẫu chưa được kết nối. Vui lòng gọi 0915.189.389 — chúng tôi tư vấn ngay.', false);
        return;
      }
      btn.disabled = true; btn.textContent = 'Đang gửi…';
      /* text/plain chứ KHÔNG phải application/json: gửi đúng kiểu JSON làm trình duyệt
         bắn một yêu cầu OPTIONS hỏi trước, mà Google Apps Script không trả lời được
         OPTIONS — khách sẽ thấy "chưa gửi được" dù mã hai bên đều đúng. Nội dung vẫn
         là JSON, nơi nhận tự đọc. */
      var hd = { 'Content-Type': 'text/plain;charset=utf-8' };
      try {
        var extra = JSON.parse(f.getAttribute('data-headers') || '{}');
        for (var k in extra) hd[k] = extra[k];
      } catch (err) { }
      fetch(ep, { method: 'POST', headers: hd, body: JSON.stringify(data) })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          f.reset();
          /* ⚠ BẮN THEO KẾT QUẢ, KHÔNG THEO CÚ BẤM. Dòng này nằm trong nhánh
             `r.ok` — tức máy chủ đã nhận. Bắn lúc bấm nút là đếm cả những lần GỬI
             HỎNG thành chuyển đổi, rồi Google Ads tối ưu để có thêm những cú bấm đó,
             tức TỐI ƯU ĐỂ FORM HỎNG NHIỀU HƠN. Số liệu vẫn tăng, tiền vẫn tiêu,
             khách vẫn không tới.
             ⚠ Chỉ đẩy LOẠI HỘP. Không tên, không số điện thoại, không nội dung gõ. */
          ebDo('lead_gui', { loai_form: ebLoaiForm(data.loai) });
          say('Đã nhận yêu cầu. Nhân viên kinh doanh sẽ gọi lại trong giờ làm việc.', true);
          /* Cho trang tự dựng khối kết quả riêng nếu nó muốn (trang Tự thiết kế vách
             hiện mã vách + nút Zalo + nút gọi). Phát SỰ KIỆN chứ không gọi thẳng một
             hàm toàn cục: trang nào không nghe thì không phải khai gì, và tệp này
             không cần biết có bao nhiêu trang đang nghe.
             ⚠ Phát trong nhánh `r.ok`, cùng chỗ với `lead_gui` — nếu phát ở chỗ khác
               thì một ngày nào đó hai thứ lệch nhau và khối kết quả hiện ra cho một
               lần gửi hỏng. */
          f.dispatchEvent(new CustomEvent('eb:gui-xong', { detail: { loai: data.loai } }));
        })
        .catch(function () {
          say('Chưa gửi được. Vui lòng gọi 0915.189.389 để được hỗ trợ ngay.', false);
        })
        .then(function () { btn.disabled = false; btn.textContent = 'Gửi yêu cầu'; });
    });
  });

  /* ---- Nhu cầu của khách đi kèm biểu mẫu (TGĐ giao 30/08/2026) ----
     Trước đây ba nút trong hộp chiết khấu của công cụ tính đều đổ về trang chính sách
     thợ hoặc trang liên hệ chung: khách không có chỗ để lại thông tin, và lead về App
     thì không nói được khách cần gì — thợ xin bảng giá riêng, chủ nhà xin giới thiệu
     đội thi công, hay khách lẻ hỏi vật tư đều rơi vào cùng một hộp.

     Nay mỗi nút mang một mã trong `?nc=`, và trang biểu mẫu:
       · đổi `data-loai` -> lead về App mang đúng mã nhu cầu
       · điền sẵn một dòng vào ô Nội dung, KHÁCH SỬA ĐƯỢC
       · in một dòng nhắc ngay trên biểu mẫu để khách biết mình đang ở đúng chỗ

     ⚠ ĐIỀN CẢ VÀO Ô NỘI DUNG, không chỉ đặt `data-loai`. Cửa nhận lead bên App có thể
     nắn mã lạ về "khac" (đang có 7 lead như vậy). Nếu chỉ dựa vào `loai` thì lúc đó
     nhu cầu của khách BIẾN MẤT trong im lặng. Câu chữ trong ô nội dung thì người đọc
     lead nào cũng thấy, bất kể App có ánh xạ mã hay chưa.
     ⚠ CHỈ điền khi ô còn TRỐNG — khách quay lại sửa rồi mà bị ghi đè là mất chữ họ gõ. */
  var EB_NHU_CAU = {
    'tho-dai-ly': ['tho_dai_ly',
      'Tôi là thợ / nhà thầu / đại lý — xin nhận bảng giá riêng theo sản lượng.',
      'Anh chị là thợ, nhà thầu hay đại lý — chúng tôi sẽ gửi bảng giá riêng.'],
    'doi-tho': ['gioi_thieu_tho',
      'Tôi là chủ nhà — nhờ Eco Bamboo giới thiệu đội thợ đã thi công vật liệu này.',
      'Chúng tôi sẽ giới thiệu đội thợ đã thi công vật liệu này trong khu vực của anh chị.'],
    'tu-van-le': ['tu_van_le',
      'Tôi cần tư vấn vật tư cho công trình của mình.',
      'Anh chị cho biết diện tích và mã màu quan tâm, nhân viên kinh doanh sẽ bóc tách vật tư.'],
    /* ⚠ NHÁNH RIÊNG, KHÔNG DÙNG LẠI 'tho-dai-ly' (TGĐ chốt 31/08/2026).
       Thẻ "Đại lý & nhà phân phối" ở trang chủ trước đây trỏ thẳng /lien-he trần, nên
       lead về App không nói được khách là ai. Cách sửa hiển nhiên là gắn 'tho-dai-ly'
       cho gọn — ĐỪNG: khoá đó gộp thợ, nhà thầu và đại lý vào một `loai`, tức là vẫn
       đúng cái vấn đề TGĐ đang báo, chỉ đẩy nó lùi một bước. Đại lý và thợ khác nhau
       ở việc kinh doanh (nguồn hàng, showroom, bảng giá phân phối), nên phải là một
       `loai` riêng thì sale mới chia đúng nhánh. */
    'dai-ly': ['dai_ly_npp',
      'Tôi là đại lý / nhà phân phối — muốn trao đổi về hợp tác phân phối.',
      'Anh chị cho biết khu vực và quy mô kinh doanh, chúng tôi trao đổi về nguồn hàng, '
      + 'bảng giá phân phối và hỗ trợ mẫu, catalogue cho showroom.'],
  };
  (function () {
    var nc = new URLSearchParams(location.search).get('nc');
    var m = nc && EB_NHU_CAU[nc];
    if (!m) return;
    var f = document.querySelector('form.ebform');
    if (!f) return;
    f.setAttribute('data-loai', m[0]);
    var nd = f.querySelector('[name="nd"]');
    if (nd && !nd.value.trim()) nd.value = m[1];
    var lead = f.querySelector('.lead');
    if (lead) lead.textContent = m[2];
    // Đưa biểu mẫu vào tầm nhìn — khách vừa bấm một nút nói rõ việc mình cần, mà đổ
    // xuống đầu một trang dài rồi bắt tự đi tìm thì đúng bằng không bấm.
    var s = f.closest('section') || f;
    if (s.scrollIntoView) s.scrollIntoView({ block: 'start' });
  })();

  /* ---- Video: chỉ tạo iframe khi khách bấm ----
     Nhúng sẵn iframe là kéo về script và cookie theo dõi của YouTube cho mọi khách,
     kể cả người không xem. Ở đây trang chỉ có một ảnh cục bộ cho tới lúc bấm. */
  document.querySelectorAll('.nd-video-nut').forEach(function (nut) {
    nut.addEventListener('click', function () {
      var id = nut.getAttribute('data-yt');
      if (!id) return;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = nut.getAttribute('aria-label') || 'Video';
      f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      f.setAttribute('allowfullscreen', '');
      nut.parentNode.replaceChild(f, nut);
    });
  });

  /* ---- Cổng tải tài liệu ----
     Điền tên + số điện thoại là mở được link Drive ngay, không phải chờ ai gửi.

     Nút là thẻ <a> có href thật và KHÔNG gọi window.open(): mở cửa sổ sau một lời gọi
     bất đồng bộ thì trình duyệt chặn như quảng cáo. Ở đây bấm hợp lệ là để trình duyệt
     đi tiếp như một cú bấm bình thường, phần ghi liên hệ chạy nền.

     Ghi liên hệ là BEST-EFFORT: chưa khai endpoint, mạng lỗi, endpoint chết — khách vẫn
     tải được. Đường ống của mình hỏng thì không phải lỗi của khách. */
  document.querySelectorAll('[data-congtai]').forEach(function (box) {
    var msg = box.querySelector('.fmsg');
    function noi(t, ok) {
      if (!msg) return;
      msg.textContent = t; msg.hidden = false;
      msg.className = 'fmsg' + (ok ? ' ok' : ' err');
    }
    function ghi(loai, ten, sdt) {
      var ep = box.getAttribute('data-endpoint') || '';
      if (!ep) return;                      // chưa nối — bỏ qua, KHÔNG chặn tải
      var data = { ten: ten, sdt: sdt, loai: 'tailieu', tailieu: loai,
                   trang: ebDuongDan(), token: box.getAttribute('data-token') || '',
                   utm: ebUtm(), tb: ebTb() };
      /* CÙNG MỘT HÀM với biểu mẫu. Cổng tải trước đây chỉ gửi chuỗi gộp `utm`, và
         nó lọt được là nhờ bên App tự tách chuỗi — một chỗ dựa không ai khai và
         không ai canh. */
      ebGanNguon(data);
      try {
        var extra = JSON.parse(box.getAttribute('data-headers') || '{}');
        /* text/plain, KHÔNG phải application/json — cùng lý do với biểu mẫu: kiểu
           application/json làm trình duyệt hỏi trước bằng OPTIONS, mà Apps Script
           không trả lời được, nên gói tin chết im lặng và mất luôn khách. sendBeacon
           với text/plain là yêu cầu đơn giản, đi thẳng.
           Đã đo bằng máy chủ giả trả 405 cho OPTIONS y như Apps Script: bản
           application/json KHÔNG tới nơi, bản text/plain tới. */
        /* ⚠ ĐỔI TỪ sendBeacon SANG fetch (31/08/2026) — và lý do là một dữ kiện đo
           được, không phải sở thích: nút tải là `<a target="_blank">`, nên trang HIỆN
           TẠI KHÔNG chuyển đi đâu cả. Cái sendBeacon đánh đổi để có (sống sót qua
           việc chuyển trang) ở đây không cần tới, còn cái nó lấy đi thì rất đắt —
           `sendBeacon` trả `true` nghĩa là "đã xếp hàng để gửi", KHÔNG phải "máy chủ
           đã nhận". Không có tín hiệu thành công thì không thể bắn chuyển đổi theo
           kết quả, mà bắn theo cú bấm là đúng thứ đã cấm ở biểu mẫu: đếm cả những
           lần ghi hỏng thành lead, rồi Google Ads tối ưu để có thêm cú bấm đó.

           Cổng tải LÀ MỘT ĐIỂM THU LEAD — nó ghi một dòng `web_lead` (`hop=tailieu`)
           y như ba biểu mẫu kia. Trước bản này nó chỉ bắn `tai_tai_lieu`, mà sự kiện
           đó KHÔNG có trình kích hoạt nào trong container: lead vào bảng App đều
           đặn trong khi Ads và Meta không thấy một chuyển đổi nào. Hỏng mà đẹp.

           `keepalive` giữ lại: khách bấm rồi đóng tab ngay thì gói tin vẫn đi. */
        var hd = { 'Content-Type': 'text/plain;charset=utf-8' };
        for (var k in extra) hd[k] = extra[k];
        if (!window.fetch) {
          /* Trình duyệt quá cũ: gửi được thì vẫn gửi, nhưng TUYỆT ĐỐI KHÔNG bắn
             `lead_gui` — không có gì xác nhận thì không được khai là đã thành công.
             Mất một chuyển đổi thật còn hơn đếm một chuyển đổi không có. */
          if (!Object.keys(extra).length && navigator.sendBeacon) {
            navigator.sendBeacon(ep, new Blob([JSON.stringify(data)],
                                              { type: 'text/plain;charset=utf-8' }));
          }
          return;
        }
        fetch(ep, { method: 'POST', headers: hd, body: JSON.stringify(data), keepalive: true })
          .then(function (r) {
            /* Chỉ trong nhánh `r.ok`, đúng luật của biểu mẫu.
               ⚠ Chỉ đẩy LOẠI HỘP. Không tên, không số điện thoại, không tên tài liệu
               khách chọn — `tai_tai_lieu` bên dưới đã chở việc đó rồi. */
            if (r.ok) ebDo('lead_gui', { loai_form: ebLoaiForm('tailieu') });
          })
          .catch(function () { });
      } catch (e) { }
    }
    box.querySelectorAll('[data-tai]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        var ten = (box.querySelector('[name=ten]').value || '').trim();
        var sdt = (box.querySelector('[name=sdt]').value || '').trim();
        var bay = (box.querySelector('[name=website]') || {}).value || '';
        if (ten.length < 2) {
          ev.preventDefault(); noi('Vui lòng nhập họ tên.', false);
          box.querySelector('[name=ten]').focus(); return;
        }
        if (!/^[0-9+\s.()-]{9,15}$/.test(sdt)) {
          ev.preventDefault(); noi('Số điện thoại chưa đúng định dạng.', false);
          box.querySelector('[name=sdt]').focus(); return;
        }
        if (bay) { ev.preventDefault(); return; }   // bẫy bot, im lặng
        ghi(a.getAttribute('data-tai'), ten, sdt);
        ebDo('tai_tai_lieu', { tai_lieu: a.getAttribute('data-tai') || '' });
        noi('Đang mở ' + a.getAttribute('data-tai') + ' trong tab mới. Cảm ơn anh chị!', true);
      });
    });
  });

  /* ---- Tài liệu TẢI TỰ DO: đo, nhưng không chặn ----
     Nút `[data-tai]` nằm NGOÀI mọi khối `[data-congtai]` là tài liệu không cần để lại
     thông tin (file map — anh Andrew chốt 28/08/2026).

     ⚠ Bỏ cổng là bỏ việc THU LIÊN HỆ, không phải bỏ việc ĐẾM. Vòng lặp ở trên chỉ gắn
     cho nút bên trong cổng, nên nếu không có khối này thì nút tải tự do sẽ hoàn toàn
     im — mất số đo `tai_tai_lieu`, mà đó là thứ nói cho ta biết tài liệu nào đáng làm
     tiếp. Mất trong im lặng, vì nút vẫn mở link bình thường.

     KHÔNG `preventDefault`, không kiểm gì: để trình duyệt mở link như một cú bấm
     thường. */
  document.querySelectorAll('[data-tai]').forEach(function (a) {
    if (a.closest('[data-congtai]')) return;
    a.addEventListener('click', function () {
      ebDo('tai_tai_lieu', { tai_lieu: a.getAttribute('data-tai') || '' });
    });
  });

  /* ---- Bản đồ: chỉ tạo iframe khi bấm (cùng lý do với khối video) ---- */
  document.querySelectorAll('.nd-map-nut').forEach(function (nut) {
    nut.addEventListener('click', function () {
      var src = nut.getAttribute('data-src');
      if (!src) return;
      var f = document.createElement('iframe');
      f.src = src; f.title = 'Bản đồ tới Eco Bamboo'; f.loading = 'lazy';
      f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      f.setAttribute('allowfullscreen', '');
      nut.parentNode.replaceChild(f, nut);
    });
  });

  /* ---- Tabs ---- */
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var btns = box.querySelectorAll('.tabbtn');
    var panes = box.querySelectorAll('.tabpane');
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x, j) { x.setAttribute('aria-selected', i === j ? 'true' : 'false'); });
        panes.forEach(function (p, j) { p.hidden = i !== j; });
      });
    });
  });

  /* ---- Thư viện ảnh sản phẩm ---- */
  document.querySelectorAll('[data-gal]').forEach(function (g) {
    var main = g.querySelector('#pdMain') || g.querySelector('.pd-media img');
    g.querySelectorAll('.pd-th').forEach(function (t) {
      t.addEventListener('click', function () {
        if (!main) return;
        /* ⚠ PHẢI GỠ srcset TRƯỚC KHI ĐỔI src.
           Ảnh chính của trang mã có srcset (ba bậc 400/800/1200w). Khi một thẻ <img>
           có srcset thì trình duyệt CHỌN ẢNH TỪ srcset và BỎ QUA src — nên gán
           `main.src = ...` không đổi gì cả, và bấm ảnh nhỏ thành ra không có tác
           dụng. Đây là lỗi thêm srcset ngày 28/08 gây ra, phát hiện ngay hôm đó.
           Các ảnh trong thư viện không có bậc nào nên gỡ srcset là đúng: từ lúc
           người dùng chọn một ảnh khác, ảnh chính chỉ còn một nguồn duy nhất. */
        main.removeAttribute('srcset');
        main.removeAttribute('sizes');
        main.src = t.getAttribute('data-src');
        var im = t.querySelector('img');
        if (im) main.alt = im.alt;
        g.querySelectorAll('.pd-th').forEach(function (x) { x.classList.remove('on'); });
        t.classList.add('on');
        /* BS64 §3 — chú thích của ĐÚNG ô vừa bấm ("Vân cả tấm 1.220 × 2.800 mm").
         ⚠ Dùng `el.hidden`, không `style.display`: cùng khuôn với mọi chỗ khác, và
           `[hidden]{display:none}` đã có trong `eb.css`.
         ⚠ Ô nào không có `data-ct` thì ẨN lại — không để chú thích của ảnh trước
           nằm dưới một tấm khác. Một dòng chữ đúng ở sai tấm ảnh là một câu sai. */
        var ct = g.querySelector('#pdCt');
        if (ct) { var v = t.getAttribute('data-ct') || '';
          ct.textContent = v; ct.hidden = !v; }
      });
    });
  });

  /* ---- Xem ảnh lớn: bấm vào ảnh sản phẩm để phóng to ---- */
  (function () {
    var gal = document.querySelector('[data-gal]');
    if (!gal) return;
    var main = gal.querySelector('#pdMain') || gal.querySelector('.pd-media img');
    if (!main) return;

    // danh sách ảnh của mã này: ảnh chính + các ảnh nhỏ
    var srcs = [], alts = [];
    var ths = gal.querySelectorAll('.pd-th');
    if (ths.length) {
      ths.forEach(function (t) {
        srcs.push(t.getAttribute('data-src'));
        var im = t.querySelector('img');
        alts.push(im ? im.alt : '');
      });
    } else {
      srcs.push(main.getAttribute('src')); alts.push(main.alt || '');
    }

    var box = document.createElement('div');
    box.className = 'lb';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Xem ảnh phóng to');
    box.hidden = true;
    box.innerHTML =
      '<button class="lb-x" aria-label="Đóng">&times;</button>' +
      '<button class="lb-nav lb-prev" aria-label="Ảnh trước">&#8249;</button>' +
      '<button class="lb-nav lb-next" aria-label="Ảnh sau">&#8250;</button>' +
      '<div class="lb-stage"><img class="lb-img" alt=""></div>' +
      '<p class="lb-hint">Bấm vào ảnh hoặc lăn chuột để phóng to · kéo để di chuyển · Esc để đóng</p>';
    document.body.appendChild(box);

    var img = box.querySelector('.lb-img');
    var stage = box.querySelector('.lb-stage');
    var i = 0, z = 1, x = 0, y = 0, drag = null, opener = null;

    function draw() {
      img.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + z + ')';
      img.style.cursor = z > 1 ? 'grab' : 'zoom-in';
      stage.classList.toggle('zoomed', z > 1);
    }
    function show(n) {
      i = (n + srcs.length) % srcs.length;
      img.src = srcs[i];
      img.alt = alts[i] || '';
      z = 1; x = 0; y = 0; draw();
      var multi = srcs.length > 1;
      box.querySelector('.lb-prev').hidden = !multi;
      box.querySelector('.lb-next').hidden = !multi;
    }
    function open(n) {
      opener = document.activeElement;
      show(n);
      box.hidden = false;
      document.body.classList.add('lb-on');
      box.querySelector('.lb-x').focus();
    }
    function close() {
      box.hidden = true;
      document.body.classList.remove('lb-on');
      if (opener && opener.focus) opener.focus();
    }
    function zoomTo(nz, cx, cy) {
      nz = Math.max(1, Math.min(5, nz));
      if (nz === 1) { x = 0; y = 0; }
      else if (cx != null) {
        var r = img.getBoundingClientRect();
        var dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
        var k = nz / z;
        x = x - dx * (k - 1); y = y - dy * (k - 1);
      }
      z = nz; draw();
    }

    main.style.cursor = 'zoom-in';
    main.addEventListener('click', function () {
      var cur = main.getAttribute('src');
      var n = srcs.indexOf(cur);
      open(n < 0 ? 0 : n);
    });

    box.querySelector('.lb-x').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(i - 1); });
    box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(i + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target === stage) close(); });

    img.addEventListener('click', function (e) {
      e.stopPropagation();
      zoomTo(z > 1 ? 1 : 2.5, e.clientX, e.clientY);
    });
    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      zoomTo(z * (e.deltaY < 0 ? 1.18 : 1 / 1.18), e.clientX, e.clientY);
    }, { passive: false });

    img.addEventListener('pointerdown', function (e) {
      if (z <= 1) return;
      drag = { px: e.clientX, py: e.clientY, x: x, y: y };
      img.setPointerCapture(e.pointerId);
      img.style.cursor = 'grabbing';
    });
    img.addEventListener('pointermove', function (e) {
      if (!drag) return;
      x = drag.x + (e.clientX - drag.px);
      y = drag.y + (e.clientY - drag.py);
      draw();
    });
    ['pointerup', 'pointercancel'].forEach(function (ev) {
      img.addEventListener(ev, function () { drag = null; img.style.cursor = z > 1 ? 'grab' : 'zoom-in'; });
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(i - 1);
      else if (e.key === 'ArrowRight') show(i + 1);
      else if (e.key === '+' || e.key === '=') zoomTo(z * 1.3);
      else if (e.key === '-') zoomTo(z / 1.3);
    });
  })();

  /* Sau khi lọc, trang ngắn lại đột ngột (bảng màu: 8783px -> 2300px). Trình duyệt kẹp
     lại vị trí cuộn và người đang gõ bị bỏ lại phía dưới: kết quả nằm TRÊN tầm nhìn, màn
     hình chỉ còn ghi chú với chân trang. Gõ mà không thấy gì đổi -> tưởng ô tìm hỏng.
     Đây mới là nguyên nhân chính của "ô tìm kiếm không dùng được", không phải phép so
     chuỗi.

     CÁI BẪY: không được lấy thanh lọc làm mốc. Nó là position:sticky nên khi còn dính
     thì luôn báo top = 82px, kể cả lúc người dùng đã ở tít dưới đáy — đo nó thì lúc nào
     cũng thấy "vẫn trong tầm nhìn" trong khi kết quả đã trôi lên mất. Phải đo chính
     KẾT QUẢ ĐẦU TIÊN, và kéo nó về ngay dưới mép dưới của thanh lọc.
     Cũng không dùng offsetTop: đó là toạ độ so với tài liệu, không đổi theo vị trí cuộn. */
  function giuTamNhin(bar, neo) {
    if (!neo) return;
    var hdr = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--hdr')) || 82;
    var day = bar ? bar.getBoundingClientRect().bottom : hdr;
    var r = neo.getBoundingClientRect();
    if (r.top >= day + 4) return;               // vẫn nhìn thấy, không đụng vào
    // Đích cuộn lấy theo MỐC TĨNH — cả khối <section> chứa thanh lọc — chứ không lấy
    // theo mép dưới thanh lọc: thanh lọc đang dính, kéo theo nó thì có lúc vẫn hụt và
    // kết quả nằm trên tầm nhìn (đo được ở truy vấn ra ít dòng nhất, trang co mạnh nhất).
    var khoi = bar && bar.closest ? bar.closest('section') : null;
    var moc = khoi || neo;
    var dich = Math.max(0, moc.getBoundingClientRect().top + window.pageYOffset - hdr - 8);
    // Phải là 'instant', KHÔNG phải 'auto': theo chuẩn, 'auto' nghĩa là dùng
    // scroll-behavior của CSS — mà html đang đặt smooth — nên mỗi chữ gõ ra lại chạy
    // một hoạt ảnh cuộn. Đo 24/08/2026: sau 400ms kết quả vẫn đang trôi, tới 900ms
    // mới đứng yên. 'instant' ép nhảy thẳng, đúng ý khối chú thích này ngay từ đầu.
    try { window.scrollTo({ top: dich, behavior: 'instant' }); }
    catch (e) { window.scrollTo(0, dich); }
  }

  /* ---- Colour library filter (bảng màu) ---- */
  /* ---------- Tìm kiếm: MỘT bộ khớp dùng chung cho bảng màu và bảng giá ----------
     Trước 24/08/2026 hai bảng có hai bản sao y hệt nhau của cùng một hàm. Chính vì
     mỗi trang tự ghép chuỗi và tự khớp một kiểu mà lần trước bảng giá bỏ dấu thiếu,
     gõ "xám" ra 0 dòng. Nay sửa một chỗ là cả hai bảng đổi theo. */
  function ebNorm(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  }
  /* BA kiểu khớp cho ba loại truy vấn khác hẳn nhau (bản 24/08/2026):

       từ có CHỮ SỐ   -> khớp ở bất kỳ đâu   (mã: gõ 66006 phải ra EB66006)
       từ ≤ 3 ký tự   -> phải khớp TRỌN TỪ   (go, da, van, xam…)
       từ ≥ 4 ký tự   -> khớp ĐẦU TỪ         (walnut, elegant, chevron…)

     Vì sao từ ngắn phải khớp trọn từ — hai ca anh Andrew báo 24/08/2026, cả hai đều
     do bỏ dấu xong từ ngắn lọt vào giữa từ tiếng Anh dài:
     · gõ "vân gỗ" ra **Elegant White Gold**: bỏ dấu thì "gỗ" thành "go", mà "gold"
       bắt đầu bằng "go".
     · gõ "vân đá" ra **cả 98 mã**: "đá" thành "da", khớp đầu từ với "dark", "dam",
       và "dau giuong" — mã nào cũng có ít nhất một trong ba.
     Khớp trọn từ chữa cả hai mà không đụng gì tới từ dài: "walnut" vẫn gõ 4 ký tự
     là ra. Cái giá phải trả là gõ 2–3 ký tự đầu của một từ dài thì chưa ra gì —
     đổi lại kết quả không còn rác, mà rác mới là thứ làm ô tìm kiếm vô dụng. */
  var ebCoDau = function (s) { return s !== ebNorm(s); };
  /* Người gõ CÓ dấu thì so trên chuỗi CÒN dấu; gõ không dấu thì so trên chuỗi đã bỏ
     dấu. Nhờ vậy "vân đá" không ra 20 mã "vân da" (da thuộc) — hai nhóm sản phẩm khác
     hẳn nhau mà bỏ dấu xong thì giống hệt. Gõ "van da" thì vẫn ra cả hai, đúng ý. */
  function ebKhop(kho, q) {
    var co = ' ' + String(kho || '').toLowerCase() + ' ';   // còn dấu
    var kg = ' ' + ebNorm(kho) + ' ';                        // đã bỏ dấu
    var tu = String(q || '').split(/\s+/);
    for (var i = 0; i < tu.length; i++) {
      var t = tu[i];
      if (!t) continue;
      var kho2 = ebCoDau(t) ? co : kg;
      var ok;
      if (/\d/.test(t)) ok = kho2.indexOf(t) >= 0;                    // mã: khớp giữa chuỗi
      else if (t.length <= 3) ok = kho2.indexOf(' ' + t + ' ') >= 0;   // TRỌN TỪ
      else ok = kho2.indexOf(' ' + t) >= 0;                            // đầu từ
      if (!ok) return false;
    }
    return true;
  }

  var lib = document.getElementById('swLib');
  if (lib) {
    var chips = lib.querySelectorAll('.chip[data-f]');
    var q = lib.querySelector('#swQ');
    var items = Array.prototype.slice.call(lib.querySelectorAll('.sw'));
    var counter = lib.querySelector('#swCount');
    var empty = lib.querySelector('#swEmpty');
    var state = { g: {}, q: '' };

    var norm = ebNorm, khop = ebKhop;   // dùng bộ khớp chung ở đầu tệp

    function apply() {
      var n = 0;
      items.forEach(function (el) {
        var ok = true;
        for (var g in state.g) {
          var v = state.g[g];
          if (!v) continue;
          if ((el.getAttribute('data-' + g) || '') !== v) { ok = false; break; }
        }
        if (ok && state.q) {
          ok = khop(el.getAttribute('data-search'), state.q);
        }
        el.hidden = !ok;
        if (ok) n++;
      });
      // ẩn nhóm không còn ô nào và cập nhật số đếm của từng nhóm
      lib.querySelectorAll('.sw-group').forEach(function (g) {
        var con = g.querySelectorAll('.sw:not([hidden])').length;
        g.hidden = con === 0;
        var lab = g.querySelector('.sw-gn');
        if (lab) lab.textContent = con + ' mã';
      });
      if (counter) counter.textContent = n;
      if (empty) empty.hidden = n !== 0;
    }

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var g = c.getAttribute('data-g'), v = c.getAttribute('data-f');
        var on = c.getAttribute('aria-pressed') === 'true';
        lib.querySelectorAll('.chip[data-g="' + g + '"]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', on ? 'false' : 'true');
        state.g[g] = on ? '' : v;
        apply();
      });
    });
    if (q) {
      var t;
      q.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () {
          state.q = q.value.trim().toLowerCase();   // KHÔNG bỏ dấu ở đây — ebKhop tự xử
          apply();
          giuTamNhin(lib.querySelector('.filterbar'),
                     lib.querySelector('.sw-group:not([hidden]) .sw:not([hidden])')
                     || lib.querySelector('#swEmpty'));
        }, 120);
      });
    }
    apply();
  }

  /* ---- Bảng giá: lọc theo từ khoá ---- */
  var pg = document.getElementById('pgLib');
  if (pg) {
    var pq = pg.querySelector('#pgQ');
    // Lọc MỌI bảng trong trang chứ không riêng bảng tấm ốp: từ bản chia tab, nẹp và lam
    // nằm ở tab khác — chỉ lọc một bảng thì gõ "nep V" ra 0 dòng dù nó có thật.
    var trs = Array.prototype.slice.call(pg.querySelectorAll('table tbody tr[data-search]'));
    var panes = Array.prototype.slice.call(pg.querySelectorAll('.tabpane'));
    var nums = Array.prototype.slice.call(pg.querySelectorAll('[data-tabnum]'));
    var pc = pg.querySelector('#pgCount');
    var pe = pg.querySelector('#pgEmpty');
    var pnorm = ebNorm, pkhop = ebKhop;   // dùng bộ khớp chung ở đầu tệp
    if (pq) {
      var pt;
      pq.addEventListener('input', function () {
        clearTimeout(pt);
        pt = setTimeout(function () {
          var q = pq.value.trim().toLowerCase(), n = 0;
          trs.forEach(function (tr) {
            var ok = !q || pkhop(tr.getAttribute('data-search'), q);
            tr.hidden = !ok; if (ok) n++;
          });
          if (pc) pc.textContent = n;
          if (pe) pe.hidden = n !== 0;
          // Số trên từng nhãn tab: cho biết bảng nào còn dòng khớp, khỏi phải bấm thử.
          panes.forEach(function (pane, i) {
            if (!nums[i]) return;
            nums[i].textContent = pane.querySelectorAll('tr[data-search]:not([hidden])').length;
          });
          // Tab đang mở không còn dòng nào mà tab khác có -> tự chuyển sang tab đó.
          // Không có bước này thì gõ "nẹp" ra "34 dòng khớp" nhưng màn hình trống trơn,
          // vì 34 dòng ấy nằm ở tab chưa mở — người dùng phải tự đoán mà bấm thử.
          var dang = -1, coKq = -1;
          panes.forEach(function (pane, i) {
            if (!pane.hidden) dang = i;
            if (coKq < 0 && pane.querySelectorAll('tr[data-search]:not([hidden])').length) coKq = i;
          });
          if (coKq >= 0 && dang >= 0 &&
              !pg.querySelectorAll('.tabpane')[dang].querySelectorAll('tr[data-search]:not([hidden])').length) {
            var nut = pg.querySelectorAll('.tabbtn');
            if (nut[coKq]) nut[coKq].click();
          }
          /* Bảng giá cuộn TRONG chính nó (.table-cao), nên khung giữ vị trí cuộn
             riêng: người đã kéo xuống giữa bảng rồi mới gõ tìm thì dòng khớp nằm phía
             TRÊN tầm nhìn của khung — gõ xong không thấy gì đổi, đúng triệu chứng lỗi
             cuộn nhảy cũ, chỉ khác là lần này ở trong khung chứ không ở trang.
             giuTamNhin() đo theo viewport nên nó KHÔNG thấy chuyện này. */
          Array.prototype.forEach.call(pg.querySelectorAll('.table-cao'), function (k) {
            k.scrollTop = 0;
          });
          giuTamNhin(pg.querySelector('.filterbar'),
                     pg.querySelector('.tabpane:not([hidden]) tr[data-search]:not([hidden])')
                     || pg.querySelector('#pgEmpty'));
        }, 120);
      });
    }
  }

  /* ---- Trang Hỏi đáp: lọc câu hỏi ---- */
  /* Dùng CHUNG ebKhop() với bảng màu và bảng giá — ba ô tìm kiếm, một bộ khớp.
     Trước đây bảng màu và bảng giá mỗi bên giữ một bản sao của cùng hàm này, và
     chính vì thế bảng giá từng quên bỏ dấu (gõ "xám" ra 0 dòng). Đừng chép lại. */
  var hd = document.getElementById('hdLib');
  if (hd) {
    var hq = hd.querySelector('#hdQ');
    var hcau = Array.prototype.slice.call(hd.querySelectorAll('.hd-q'));
    var hc = hd.querySelector('#hdCount');
    var he = hd.querySelector('#hdEmpty');
    var hjump = hd.querySelector('.hd-jump');
    var hdDangTim = false;

    function hdLoc() {
      var q = hq ? hq.value.trim().toLowerCase() : '';
      var n = 0;
      hcau.forEach(function (el) {
        var ok = !q || ebKhop(el.getAttribute('data-search'), q);
        el.hidden = !ok;
        // Đang lọc thì mở sẵn câu khớp: người gõ tìm là muốn ĐỌC câu trả lời,
        // bắt bấm thêm một lần nữa vào từng câu là thừa một bước.
        if (q) { el.open = ok; } else { el.open = false; }
        if (ok) n++;
      });
      hd.querySelectorAll('.hd-g').forEach(function (g) {
        var con = g.querySelectorAll('.hd-q:not([hidden])').length;
        g.hidden = con === 0;
        var lab = g.querySelector('.hd-n');
        if (lab) lab.textContent = con + ' câu';
      });
      // Dãy chip nhảy nhóm chỉ đúng khi hiện đủ nhóm — đang lọc thì giấu đi,
      // bấm vào nhóm đã bị ẩn là nhảy xuống khoảng trắng.
      if (hjump) hjump.hidden = !!q;
      if (hc) hc.textContent = n;
      if (he) he.hidden = n !== 0;

      /* Trang này KHÁC bảng màu và bảng giá ở một điểm: ô tìm nằm sau phần hero cao,
         nên lúc người dùng còn ở đầu trang thì kết quả đầu tiên rơi xuống tận đáy màn
         hình. Đo 25/08/2026 ở 1280×720: gõ "keo" từ đầu trang, kết quả đầu ở y=707/720
         — kỹ thuật là "vẫn trong tầm nhìn" nên giuTamNhin() không đụng vào, còn người
         dùng thì gõ xong không thấy gì đổi. Đúng triệu chứng của lỗi cuộn nhảy cũ,
         chỉ khác dấu.
         Nên khi BẮT ĐẦU một lượt tìm (ô đang rỗng chuyển sang có chữ) thì kéo hẳn khối
         lọc lên đầu màn hình. Chỉ làm ở lượt đầu: làm mỗi phím gõ là giật trang. */
      var dangTim = !!q;
      if (dangTim && !hdDangTim) {
        var kh = hd.querySelector('.filterbar');
        kh = kh && kh.closest ? kh.closest('section') : null;
        if (kh) {
          var hdr = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue('--hdr')) || 82;
          var dich = Math.max(0, kh.getBoundingClientRect().top + window.pageYOffset - hdr - 8);
          if (dich > window.pageYOffset) {
            try { window.scrollTo({ top: dich, behavior: 'instant' }); }
            catch (e) { window.scrollTo(0, dich); }
          }
        }
      }
      hdDangTim = dangTim;

      giuTamNhin(hd.querySelector('.filterbar'),
                 hd.querySelector('.hd-g:not([hidden]) .hd-q:not([hidden])')
                 || hd.querySelector('#hdEmpty'));
    }

    if (hq) {
      var ht;
      hq.addEventListener('input', function () {
        clearTimeout(ht);
        ht = setTimeout(hdLoc, 120);
      });
    }
    // Mở thẳng một câu qua neo (/hoi-dap#…) — sale gửi link câu trả lời cho khách
    // qua Zalo thì câu đó phải bung sẵn, không bắt bấm thêm.
    function hdMoNeo() {
      var id = (location.hash || '').replace('#', '');
      if (!id) return;
      var el = document.getElementById(id);
      if (el && el.tagName === 'DETAILS') { el.open = true; }
    }
    window.addEventListener('hashchange', hdMoNeo);
    hdMoNeo();
  }

})();

/* ── NÚT "Xem trên phòng" trên từng ô mã (22/09/2026) ───────────────────────────
   Ô mã đã là một thẻ <a>, mà <a> lồng <a> là HTML không hợp lệ — nên nút là <span>
   và chỗ này bắt cú bấm hộ nó.
   ⚠ `stopPropagation` TRƯỚC `preventDefault`: không chặn nổi sự kiện nổi lên thì cú
     bấm chạy tiếp vào thẻ <a> bọc ngoài và khách rơi vào trang chi tiết mã — đúng
     chỗ họ vừa chọn KHÔNG đi.
   ⚠ Uỷ quyền trên document: lưới mã được vẽ lại mỗi lần lọc, gắn tay từng nút thì
     lọc xong là mất hết. */
(function () {
  var DICH = '/thu-vien-ma-mau/phoi-mau/?ma=';
  function di(e) {
    var n = e.target.closest && e.target.closest('.sw-pm');
    if (!n) return;
    e.stopPropagation(); e.preventDefault();
    ebDo && ebDo('phoi_mau_tu_o_mau', { ma: n.dataset.pm || '' });
    location.href = DICH + encodeURIComponent(n.dataset.pm || '');
  }
  document.addEventListener('click', di);
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList
        && e.target.classList.contains('sw-pm')) di(e);
  });
})();
