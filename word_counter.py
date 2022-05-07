import glob
import string
import codecs
from collections import Counter
import json

def get_book_unique_words(filename):
    with open(filename) as f:
        txt = f.read()
    txt = txt.replace("\n", " ")
    # print(string.punctuation)
    special_punctuation = "—¡¿»«0123456789…"
    txt = txt.translate(str.maketrans("", "", string.punctuation + special_punctuation))
    words = txt.split(" ")
    unique_words = list(words)
    unique_words = list([w.upper() for w in words])
    unique_words = list(filter(lambda x: x, unique_words))
    return unique_words

def get_common_words():
    filenames = glob.glob("./books/*.txt")

    result = []

    books = filenames[0:100]
    for book in books:
        new_words = get_book_unique_words(book)
        result = result + new_words

    # print(result[100:200])

    word_usage = Counter(result)

    # word_usage = use_counter()

    with codecs.open('./results/most_common_alt.json', 'w', 'utf-8') as f:
        com = list(word_usage.most_common(1500))
        com = [item[0] for item in com]
        f.write(json.dumps(com, ensure_ascii=False))
        

get_common_words()