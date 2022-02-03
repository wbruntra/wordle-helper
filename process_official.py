import json
import random

with open('./results/words-common-7.json') as f:
    common_words = json.load(f)

with open('./results/official-answers-ordered.json') as f:
    word_list = json.load(f)

word_list = [w.upper() for w in word_list]

# print(word_list[0:10])

# with open('./results/official-answers-alphabetical.json', 'w') as f:
#     # word_list = [w.upper() for w in word_list]
#     f.write(json.dumps(word_list, indent=2))

full_word_list = sorted(set(common_words + word_list))

with open('./results/common-plus-official.json', 'w') as f:
    # word_list = [w.upper() for w in word_list]
    f.write(json.dumps(full_word_list, indent=2))
