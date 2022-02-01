import json

with open('./starterList.json') as f:
    words = json.load(f)


def has_mutual(s1, s2):
    for l in s1:
        if l in s2:
            return True
    return False


for word in words:
    common = 'RSTLNEA'
    # if has_mutual(word, common):
    #     continue
    letters = set(word)
    if len(letters) <= 2:
        print(word, len(letters))
