from collections import Counter
import json
import random


def get_frequencies(wordlist):
    all_words = ''.join(wordlist)
    c = Counter(all_words)

    for letter, freq in c.most_common():
        print(f'{letter} : {100 * freq/len(all_words):.2f}%')


with open('./results/words-common-7.json') as f:
    wordlist = json.load(f)
    random.shuffle(wordlist)
    wordlist = wordlist[0:800]

print('---NORMAL LIST---')
get_frequencies(wordlist)

with open('./results/official-answers-ordered.json') as f:
    wordlist = json.load(f)
    wordlist = wordlist[0:210]

print('---WORDLE LIST---')
get_frequencies(wordlist)

# print(c)
