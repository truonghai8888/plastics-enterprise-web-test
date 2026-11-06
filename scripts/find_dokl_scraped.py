with open('scraped_data/ecobamboo_tu_thiet_ke_vach.html', 'r', encoding='utf-8') as f:
    text = f.read()

for tid in ["doKL", "bangKL", "guKhoi"]:
    idx = text.find(f'id="{tid}"')
    print(f"=== {tid} in scraped ===")
    if idx != -1:
        print(text[idx-40:idx+350])
    else:
        print("NOT FOUND!")
