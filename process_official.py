import json
import random

with open('./official-answers.json') as f:
    word_list = json.load(f)

word_list = [w.upper() for w in word_list]

random.shuffle(word_list)

print(word_list[0:10])

with open('./results/official-answers.json', 'w') as f:
    f.write(json.dumps(word_list, indent=2))
