with open('src/pages/WallDesignerPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

additional_css = """
            /* ==========================================================================
               CÁC QUY TẮC BỔ SUNG THEO YÊU CẦU TODO.MD (ITEMS 1, 4, 5, 7)
               ========================================================================== */

            /* ITEM 4: LUÔN HIỂN THỊ TOOLBAR TRÊN KHUNG 3D / SƠ ĐỒ 2D */
            #vachStudioMount .v3-cong,
            #vachStudioMount #v3Tuy,
            .v3-cong, #v3Tuy {
              z-index: 25 !important;
              display: flex !important;
              visibility: visible !important;
              pointer-events: auto !important;
            }

            #vachStudioMount .v3-tuy-nut,
            .v3-tuy-nut {
              display: inline-flex !important;
              visibility: visible !important;
              opacity: 1 !important;
            }

            /* Khi xem sơ đồ 2D (.so-do, .md-thaycho), không được ẩn toolbar */
            html.md-thaycho #v3Tuy .v3-tuy-nut,
            html.dt-on.md-thaycho #v3Tuy .v3-tuy-nut {
              display: inline-flex !important;
              visibility: visible !important;
            }

            #vachStudioMount .so-do,
            .so-do {
              z-index: 10 !important;
            }

            /* ITEM 5: ĐỊNH DẠNG TABLE BẢNG KHỐI LƯỢNG & BÁO GIÁ ĐẸP MẮT, RÕ RÀNG */
            #vachStudioMount #v3Bang[data-vat="vach"] table,
            #vachStudioMount .v3-bang table,
            #vachStudioMount .bg-bang,
            #vachStudioMount #bangSo {
              display: table !important;
              width: 100% !important;
              border-collapse: separate !important;
              border-spacing: 0 !important;
              margin-top: 8px !important;
              margin-bottom: 12px !important;
              border-radius: 8px !important;
              overflow: hidden !important;
              border: 1px solid #e5e7eb !important;
              font-size: 11.5px !important;
              line-height: 1.4 !important;
              background: #ffffff !important;
            }

            #vachStudioMount .v3-bang thead,
            #vachStudioMount .bg-bang thead,
            #vachStudioMount #bangSo thead {
              background: #f8fafc !important;
              border-bottom: 1.5px solid #e2e8f0 !important;
            }

            #vachStudioMount .v3-bang th,
            #vachStudioMount .bg-bang th,
            #vachStudioMount #bangSo th {
              padding: 8px 6px !important;
              font-size: 10.5px !important;
              font-weight: 700 !important;
              text-transform: uppercase !important;
              letter-spacing: 0.03em !important;
              color: #334155 !important;
              border-bottom: 1.5px solid #cbd5e1 !important;
            }

            #vachStudioMount .v3-bang td,
            #vachStudioMount .bg-bang td,
            #vachStudioMount #bangSo td {
              padding: 7px 6px !important;
              border-bottom: 1px solid #f1f5f9 !important;
              color: #1e293b !important;
              font-size: 11.5px !important;
            }

            #vachStudioMount .v3-bang tbody tr:nth-child(even),
            #vachStudioMount .bg-bang tbody tr:nth-child(even),
            #vachStudioMount #bangSo tbody tr:nth-child(even) {
              background-color: #f8fafc !important;
            }

            #vachStudioMount .v3-bang tbody tr:hover,
            #vachStudioMount .bg-bang tbody tr:hover,
            #vachStudioMount #bangSo tbody tr:hover {
              background-color: #fef9ee !important;
            }

            #vachStudioMount .v3-bang th.n,
            #vachStudioMount .v3-bang td.n,
            #vachStudioMount .bg-bang th:nth-child(2),
            #vachStudioMount .bg-bang td:nth-child(2),
            #vachStudioMount .bg-bang th:nth-child(3),
            #vachStudioMount .bg-bang td:nth-child(3),
            #vachStudioMount .bg-bang th:nth-child(4),
            #vachStudioMount .bg-bang td:nth-child(4) {
              text-align: right !important;
              font-variant-numeric: tabular-nums !important;
            }

            #vachStudioMount .tw,
            #vachStudioMount .table-scroll,
            #vachStudioMount #bangKL,
            #vachStudioMount #klTamTinh {
              width: 100% !important;
              max-width: 100% !important;
              overflow-x: auto !important;
              scrollbar-width: thin !important;
              box-sizing: border-box !important;
            }

            /* Bảng tóm tắt vật tư (#doKL) */
            #vachStudioMount #doKL .do-grid {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 8px !important;
              margin: 8px 0 !important;
            }

            #vachStudioMount #doKL .do-grid > div {
              background: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 8px !important;
              padding: 8px 6px !important;
              text-align: center !important;
            }

            #vachStudioMount #doKL .do-grid b {
              display: block !important;
              font-size: 16px !important;
              font-weight: 800 !important;
              color: #b88b1b !important;
            }

            #vachStudioMount #doKL .do-grid small {
              display: block !important;
              font-size: 10.5px !important;
              color: #64748b !important;
              margin-top: 2px !important;
            }

            /* ITEM 1: KHẮC PHỤC CHỮ TRONG CÁC NÚT ĐÁY COMPONENT BỊ CHE / KHÔNG HIỂN THỊ */
            #dtBuoc, .dt-buoc {
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              gap: 6px !important;
              box-sizing: border-box !important;
              width: 100% !important;
            }

            #dtBuoc button, .dt-buoc button {
              flex: 1 1 0 !important;
              min-width: 0 !important;
              min-height: 40px !important;
              padding: 0 4px !important;
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 4px !important;
              border-radius: 8px !important;
              font-size: 11.5px !important;
              font-weight: 600 !important;
              line-height: 1.2 !important;
              text-align: center !important;
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
            }

            /* Đảm bảo chỉ hiện 1 nhãn chữ duy nhất, KHÔNG BAO GIỜ hiện đồng thời cả .b-dai và .b-ngan */
            #dtBuoc button > .b-dai {
              display: inline !important;
            }
            #dtBuoc button > .b-ngan {
              display: none !important;
            }
            @media (max-width: 520px) {
              #dtBuoc button > .b-dai {
                display: none !important;
              }
              #dtBuoc button > .b-ngan {
                display: inline !important;
                font-size: 11px !important;
              }
            }

            /* Sheet drawer đáy (#dtTam) không bị che khuất và nội dung luôn đọc được */
            #dtTam, .dt-tam {
              background: #ffffff !important;
              color: #111827 !important;
              border-radius: 16px 16px 0 0 !important;
              box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15) !important;
            }

            .dt-tam-dau {
              padding: 10px 14px !important;
              border-bottom: 1px solid #e5e7eb !important;
              background: #fafaf9 !important;
              font-size: 13px !important;
              font-weight: 700 !important;
            }

            .dt-tam-than {
              max-height: 52vh !important;
              overflow-y: auto !important;
              -webkit-overflow-scrolling: touch !important;
              padding: 12px 14px 40px !important;
            }

            /* ITEM 7: RESPONSIVE CHO KHUNG STUDIO TRÊN MỌI THIẾT BỊ */
            @media (max-width: 1024px) {
              #vachStudioMount .v3 {
                height: auto !important;
                min-height: 500px !important;
                max-height: none !important;
                grid-template-columns: 1fr !important;
                grid-template-rows: auto auto auto !important;
                grid-template-areas: "cot" "san" "bang" !important;
              }
              #vachStudioMount .v3-cot {
                width: 100% !important;
                border-right: none !important;
                border-bottom: 1.5px solid #e5e7eb !important;
                max-height: 200px !important;
              }
              #vachStudioMount .v3-bang {
                width: 100% !important;
                max-width: none !important;
                border-left: none !important;
                border-top: 1.5px solid #e5e7eb !important;
              }
            }
"""

marker = "#vachStudioMount .bg-form textarea:focus {\n              border-color: #deaa26 !important;\n              outline: 2px solid rgba(222, 170, 38, 0.2) !important;\n            }"

if marker in content:
    content = content.replace(marker, marker + "\n" + additional_css)
    with open('src/pages/WallDesignerPage.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added CSS rules to WallDesignerPage.jsx successfully!")
else:
    print("Marker not found in WallDesignerPage.jsx!")
