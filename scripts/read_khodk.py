with open('scraped_data/vach_main_clean.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos_khodk = text.find('id="khoDK"')
print("--- From khoDK onward (first 3000 chars) ---")
print(text[pos_khodk:pos_khodk+3000])

print("\n--- Next 3000 chars ---")
print(text[pos_khodk+3000:pos_khodk+6000])
