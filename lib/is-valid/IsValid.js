//sutampa su Register.js const validationRule = inputDOM.dataset.validation;
// error-first approach

class IsValid {
    static fullname(str) {  //str stringas tiesiog name
        if (str === undefined) {
            return [true, 'Neduotas parametras']
        }
        // ar buvo gauta klaida 
        if (typeof str !== 'string') {
            // true taip buvo klaida ir kokia klaida parasoma 
            return [true, 'Netinkamas tipas, turi buti "string"']
        }

        const maxSize = 100;
        if (str.length > maxSize) {
            return [true, `Per ilgas pilnas vardas, negali virsyti ${maxSize} simboliu`];
        }

        //pirma validacija formatavimas iiiiir tada funkcijos aprasancios visus scenarijus
        str = str.trim().replace(/\s+/g, ' ');
        // str = str.trim().replaceAll('  ', ' '); // nes pas mane sitas neveikia :(

        const minWordsCount = 2;
        const minWordLength = 2;
        const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);
        if (str.length < minTextLength) {
            return [true, `Per trumpas tekstas, turi buti minimum ${minTextLength} simboliai`];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const words = str.split(' ');
        if (words.length < minWordsCount) {
            return [true, `Tekstas turi tureti ${minWordsCount} arba daigiau zodziu`];
        }
        for (const word of words) {
            if (word.length < minWordLength) {
                return [true, `Visos vardo dalys turi buti minimum ${minWordLength} simboliu`];
            }

            // pirma raide
            if (word[0].toUpperCase() !== word[0]) {
                return [true, `Pirma zodzio raide turi buti didzioji`];
            }

            // kitos raides
            const otherLetters = word.slice(1);
            if (otherLetters.toLowerCase() !== otherLetters) {
                return [true, `Ne pirma zodzio raide turi buti mazoji`];
            }

            // ar tik leistinos raides
            for (const s of word) {
                if (!allowedSymbols.includes(s)) {
                    return [true, `Neleistinas simbolis "${s}"`];
                }
            }
        }

        return [false, 'OK'];
    }

    static email(str) {
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }
        if (str === '') {
            return [true, 'Neivestas email adresas'];
        }

        str = str.trim();

        const maxSize = 100;
        if (str.length > maxSize) {
            return [true, `Per ilgas email, negali virsyti ${maxSize} simboliu`];
        }

        const parts = str.split('@');
        if (parts.length !== 2) {
            return [true, 'El pasto adresas privalo tureti tik viena @ simboli'];
        }

        const [locale, domain] = parts;
        if (locale === '') {
            return [true, 'Truksta dalies pries @ simboli'];
        }
        if (domain === '') {
            return [true, 'Truksta dalies uz @ simboli'];
        }

        if (str.includes('..')) {
            return [true, 'El pastas negali tureti dvieju tastu is eiles'];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.';
        if (locale[0] === '.'
            || !isNaN(+locale[0])) {
            return [true, 'El pastas turi prasideti raide'];
        }
        for (const symbol of locale) {
            if (!allowedSymbols.includes(symbol)) {
                return [true, `Pries @ neleistinas naudoti simbolis "${symbol}"`];
            }
        }

        const domainParts = domain.split('.');
        if (domainParts.length === 1) {
            return [true, 'Uz @ simbolio truksta tasko (netinkamas domenas)'];
        }
        if (domainParts[0] === '') {
            return [true, `Uz @ dalies tekstas negali prasideti tasku`];
        }
        if (domainParts[domainParts.length - 1].length < 2) {
            return [true, `Uz @ dalies domenas turi baigtis bent dviejomis raidemis`];
        }
        for (const symbol of domain) {
            if (!allowedSymbols.includes(symbol)) {
                return [true, `Uz @ neleistinas naudoti simbolis "${symbol}"`];
            }
        }
        return [false, 'OK'];
    }

    //simple varijantas
    // static email(str) {
    //     if (str === undefined) {
    //         return [true, 'Neduotas parametras'];
    //     }

    //     if (typeof str !== 'string') {
    //         return [true, 'Netinkamas tipas, turi buti "string"']
    //     }

    //     str = str.trim();

    //     const minWordLength = 6;
    //     if (str.length < minWordLength) {
    //         return [true, `Per trumpas , turi buti minimum ${minWordLength} simboliai`];
    //     }

    //     const allowedEmailSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.@';

    //     let simbolCount = 0;

    //     //neliesti
    //     for (const simbol of str) {
    //         if (simbol === '@') {
    //             simbolCount++
    //         }
    //     }

    //     if (simbolCount === 0 || simbolCount > 1) {
    //         return [true, 'email turi tureti tik viena @ simboli']
    //     }

    //     if (str[0] === '@') {
    //         return [true, 'truksta teksto pries @ simbolio']
    //     }

    //     // if (str[str.length - 1] === '@') {
    //     //     return [true, 'truksta teksto po @ simbolio']
    //     // }
    //     if (str.at(-1) === '@') {
    //         return [true, 'truksta teksto po @ simbolio']
    //     }

    //     for (const simbol of str) {
    //         if (!allowedEmailSymbols.includes(simbol)) {
    //             return [true, `neleistinas simbolis - ${simbol}`]
    //         }
    //     }

    //     const splitedEmailStr = str.split('@')[1]

    //     let dotCount = 0;

    //     for (const simbolDot of splitedEmailStr) {
    //         if (simbolDot === '.') {
    //             dotCount++
    //         }
    //     }

    //     if (dotCount === 0) {
    //         return [true, 'netinkamas domenas']
    //     }

    //     if (str.at(-2) === '.' || str.at(-1) === '.') {
    //         return [true, 'el. pastas turi baigtis bent dvejomis raidemis']
    //     }

    //     if (str.includes('..')) {
    //         return [true, 'du taskai is eiles']
    //     }

    //     return [false, 'OK'];
    // }

    static password(str) {
        const minPasswordLength = 12;
        const maxPasswordLength = 120;

        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }
        if (str.length < minPasswordLength) {
            return [true, `Per trumpas password tekstas, turi buti minimum ${minPasswordLength} simboliai`];
        }
        if (str.length > maxPasswordLength) {
            return [true, `Per ilgas password tekstas, negali virsyti ${maxPasswordLength} simboliai`];
        }

        return [false, 'OK'];
    }
}

export { IsValid }

// pavizdukas
// 1petras@mail.com - blogas
// !isNaN(+locale[0])
// !isNaN(+'1petras'[0])
// !isNaN(+'1')
// !isNaN(1)
// !false
// true
