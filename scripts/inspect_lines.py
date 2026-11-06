with open('scraped_data/vach_main_clean.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the entire clean HTML length and structure
print("Total length:", len(text))

# Let's print the top level elements inside the main container
import re
lines = text.splitlines()
print(f"Total lines: {len(lines)}")
for i in range(min(50, len(lines))):
    print(lines[i])
