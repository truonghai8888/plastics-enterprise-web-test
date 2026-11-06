with open('scripts/test_mock_browser.cjs', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect test_mock_browser around moMuc
idx = text.find('window.VACH_REINIT')
print(text[idx-200:idx+600])
