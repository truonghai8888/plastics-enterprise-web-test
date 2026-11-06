import re

with open('scripts/generate_wall_designer.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Update button alignment and logo CSS
old_dau_button = """            /* Chuẩn hóa nút bấm: KHÔNG BỊ XÔ LỆCH, CĂNG GIỮA TUYỆT ĐỐI */
            #vachStudioMount .v3-dau button {
              height: 34px !important;
              line-height: 34px !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              font-size: 12px !important;
              font-weight: 600 !important;
              padding: 0 11px !important;
              margin: 0 !important;
              box-sizing: border-box !important;
              border-radius: 7px !important;
              cursor: pointer !important;
              white-space: nowrap !important;
              text-decoration: none !important;
              transition: all 0.15s ease-in-out !important;
            }"""

new_dau_button = """            /* Chuẩn hóa nút bấm: KHÔNG BỊ XÔ LỆCH, CĂN GIỮA TUYỆT ĐỐI */
            #vachStudioMount .v3-dau button {
              height: 34px !important;
              line-height: 1 !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              font-size: 12px !important;
              font-weight: 600 !important;
              padding: 0 12px !important;
              margin: 0 !important;
              box-sizing: border-box !important;
              border-radius: 7px !important;
              cursor: pointer !important;
              white-space: nowrap !important;
              text-decoration: none !important;
              vertical-align: middle !important;
              transition: all 0.15s ease-in-out !important;
            }

            #vachStudioMount .v3-logo-chu {
              display: flex !important;
              flex-direction: column !important;
              line-height: 1.2 !important;
              justify-content: center !important;
            }
            #vachStudioMount .v3-logo-chu b {
              color: #b88b1b !important;
              font-size: 13px !important;
              font-weight: 900 !important;
              letter-spacing: 0.5px !important;
              line-height: 1.2 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            #vachStudioMount .v3-logo-chu i {
              color: #845b17 !important;
              font-size: 9px !important;
              font-weight: 700 !important;
              font-style: normal !important;
              letter-spacing: 1px !important;
              line-height: 1.2 !important;
              margin: 0 !important;
              padding: 0 !important;
            }"""

assert old_dau_button in content, "old_dau_button not found"
content = content.replace(old_dau_button, new_dau_button)

# Update v3-san and v3-bang logic for 1a vs 1b
old_san_bang = """            /* KHUNG CANVAS 3D CHÍNH Ở GIỮA - LUÔN HIỂN THỊ, KHÔNG BỊ ÁN NGỮ */
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-san,
            #vachStudioMount .v3-san {
              visibility: visible !important;
              height: 100% !important;
              min-height: 480px !important;
              grid-column: 2 !important;
              grid-row: san !important;
              position: relative !important;
              background: #181716 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              overflow: hidden !important;
            }
            #vachStudioMount .v3-san canvas#c {
              width: 100% !important;
              height: 100% !important;
              display: block !important;
              touch-action: none !important;
            }

            /* BẢNG BÊN PHẢI ĐƯỢC GIỚI HẠN VÀO CỘT 3 - KHÔNG TRÀN RA GIỮA */
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-bang,
            #vachStudioMount .v3-bang {
              grid-column: 3 !important;
              grid-row: bang !important;
              width: 380px !important;
              max-width: 380px !important;
              background: #ffffff !important;
              border-left: 1.5px solid #e5e7eb !important;
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              padding: 16px !important;
              box-sizing: border-box !important;
            }"""

new_san_bang = """            /* KHUNG CANVAS 3D & BẢNG BƯỚC: BƯỚC 1A (MẪU KHỞI ĐẦU) VS BƯỚC TIẾP THEO */
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-san {
              display: none !important;
            }
            html.v3-mau:not(.dt-on) #vachStudioMount .v3-bang {
              grid-column: 2 / span 2 !important;
              grid-row: san !important;
              width: 100% !important;
              max-width: none !important;
              background: #ffffff !important;
              border-left: 1.5px solid #e5e7eb !important;
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              padding: 20px 24px !important;
              box-sizing: border-box !important;
            }
            html.v3-mau:not(.dt-on) #vachStudioMount .bo-mau {
              display: grid !important;
              grid-template-columns: repeat(4, 1fr) !important;
              gap: 14px !important;
            }

            /* CÁC BƯỚC CÒN LẠI: CANVAS 3D CỘT 2, BẢNG ĐIỀU KHIỂN CỘT 3 (380px) */
            html:not(.v3-mau):not(.dt-on) #vachStudioMount .v3-san,
            #vachStudioMount .v3-san {
              display: flex !important;
              visibility: visible !important;
              height: 100% !important;
              min-height: 480px !important;
              grid-column: 2 !important;
              grid-row: san !important;
              position: relative !important;
              background: #181716 !important;
              align-items: center !important;
              justify-content: center !important;
              overflow: hidden !important;
            }
            #vachStudioMount .v3-san canvas#c {
              width: 100% !important;
              height: 100% !important;
              display: block !important;
              touch-action: none !important;
            }

            html:not(.v3-mau):not(.dt-on) #vachStudioMount .v3-bang,
            #vachStudioMount .v3-bang {
              display: block !important;
              grid-column: 3 !important;
              grid-row: bang !important;
              width: 380px !important;
              max-width: 380px !important;
              background: #ffffff !important;
              border-left: 1.5px solid #e5e7eb !important;
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              padding: 16px !important;
              box-sizing: border-box !important;
            }"""

assert old_san_bang in content, "old_san_bang not found"
content = content.replace(old_san_bang, new_san_bang)

with open('scripts/generate_wall_designer.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("generate_wall_designer.py updated successfully!")
