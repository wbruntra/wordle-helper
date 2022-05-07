import json
from os import walk
import codecs
import string
import glob
from collections import Counter


def get_book_unique_words(filename, official_words = None):
    with open(filename) as f:
        txt = f.read()
    txt = txt.replace("\n", " ")
    # print(string.punctuation)
    special_punctuation = "—¡¿»«0123456789…"
    txt = txt.translate(str.maketrans("", "", string.punctuation + special_punctuation))
    words = txt.split(" ")
    unique_words = set(words)
    unique_words = set([w.upper() for w in words])
    if official_words:
        print('Limiting words')
        unique_words = set(official_words).intersection(unique_words)
    return unique_words


def get_canonical(s):
    canonical = s[:]
    accents = {
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",
    }
    for [accented, plain_vowel] in accents.items():
        canonical = canonical.replace(accented, plain_vowel)

    return canonical


def add_participles():
    with open("./5-word-list-rae-official.json") as f:
        official_words_5 = json.load(f)
    verb_endings = ["AR", "ER", "IR"]
    verbs = [w for w in sorted(official_words_5) if w[-2:] in verb_endings]
    result = set()
    for word in verbs:
        if word[-2:] == "AR":
            word = word[:-2] + "ADO"
            result.add(word)
            # word = word[:-2] + "ADA"
            # result.add(word)
        elif word[-2:] in ["ER", "IR"]:
            word = word[:-2] + "IDO"
            result.add(word)
            # word = word[:-2] + "IDA"
            # result.add(word)
    # print(sorted(result))
    return result


def add_plural_participles():
    with open("./4-word-list.json") as f:
        official_words_4 = json.load(f)

    verb_endings = ["AR", "ER", "IR"]
    verbs = [w for w in sorted(official_words_4) if w[-2:] in verb_endings]
    result = set()
    for word in verbs:
        if word[-2:] == "AR":
            word = word[:-2] + "ADOS"
            result.add(word)
        elif word[-2:] in ["ER", "IR"]:
            word = word[:-2] + "IDOS"
            result.add(word)
    return result


def add_long_plurals():
    with open("./4-word-list.json") as f:
        official_words_4 = json.load(f)
    noun_endings = "BDFJLMNPRSTV"

    accents = "ÁÉÍÓÚ"

    result = set()

    for word in official_words_4:
        if word[-1] == "Z":
            result.add(word[:-1] + "CES")
        elif word[-2] in accents:
            result.add(word[:-2] + get_canonical(word[-2]) + word[-1] + "ES")
        elif word[-1] in noun_endings:
            result.add(word + "ES")

    return result


def get_modified_words():
    result = set()
    result = result.union(add_participles())
    result = result.union(add_plural_participles())
    result = result.union(add_long_plurals())
    return result


def get_all_official_words():
    with open("./src/starterList.json") as f:
        official_words = json.load(f)
        official_words = set(official_words)

    return official_words


def run_official():
    with open("./src/starterList.json") as f:
        official_words = json.load(f)
        official_words = set(official_words)

    filenames = glob.glob("./books/*.txt")

    result = set()

    for book in filenames:
        new_words = get_book_unique_words(book, official_words)
        result = result.union(new_words)

    # NOTE: Allow valid to be longer than answers because a mistake in the valid
    # word list is not important

    # with codecs.open("valid-word-list-xl.json", "w", "utf-8") as f:
    #     f.write(json.dumps(sorted(list(official_words)), indent=2, ensure_ascii=False))

    with codecs.open("common-words.json", "w", "utf-8") as f:
        f.write(json.dumps(sorted(list(result)), indent=2, ensure_ascii=False))

    return "OK"


def use_counter():
    official_words = get_all_official_words()

    word_usage = Counter()

    filenames = glob.glob("./books/*.txt")

    for book in filenames:
        new_words = get_book_unique_words(book, official_words)
        word_usage.update(new_words)

    return word_usage

def get_common_words():
    filenames = glob.glob("./books/*.txt")

    result = set()

    for book in filenames:
        new_words = get_book_unique_words(book)
        result = result.union(new_words)

    word_usage = use_counter()

    with codecs.open('./results/most_common.json', 'w', 'utf-8') as f:
        com = list(word_usage.most_common(1000))
        f.write(json.dumps(com))


def make_wordlist_with_common(min_books_required):
    result = set()
    word_usage = use_counter()

    for word, count in word_usage.items():
        if count >= min_books_required:
            result.add(word)

    result = sorted(result)

    with codecs.open(
        f"./results/words-common-{min_books_required}.json", "w", "utf-8"
    ) as f:
        f.write(json.dumps(sorted(list(result)), indent=2, ensure_ascii=False))

    return sorted(result)


def get_answer_coverage(wordlist):
    with open('./results/official-answers-ordered-upper.json') as f:
        official = json.load(f)

    combined = set(official + wordlist)
    d = len(combined) - len(wordlist)

    a = f'Wordlist has {len(wordlist)} words, {100 - (100 * d/len(official)):.2f}% coverage'
    print(a)


# run()
# save_official()
# add_participles()
# add_plural_participles()
# add_long_plurals()

if __name__ == "__main__":
    print("make wordlist main")
    # test_unicode()
    # modified_words = get_modified_words()
    # run_official()
    # use_counter()
    # common_wordlist = make_wordlist_with_common(5)
    # get_answer_coverage(common_wordlist)
    get_common_words()

# print(modified_words)
