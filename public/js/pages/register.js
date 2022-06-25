import { IsValid } from "../components/IsValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', async (e) => {
        e.preventDefault();

        notificationsDOM.classList.remove('show'); //paslepiam visas klaidas

        const data = {}; //kaupiam duom
        const errors = []; // kaupiam klaidas

        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation; //issitraukiam validuoj. funkc.pav.
                const [err, msg] = IsValid[rule](inputDOM.value); // grazina klaida, jei istiko klaida

                if (err) {
                    errors.push(msg); //jei istiko klaida- ja kaupiam masyve
                } else {
                    data[inputDOM.name] = inputDOM.value; //jei  nera klaidos, kaupiam rezultata
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
                if (!inputDOM.checked) {
                    errors.push('Privaloma sutikti su TOS');
                }
            }
        }

        if (inputsDOM[2].value !== inputsDOM[3].value) {
            errors.push('Slaptazodziai nesutampa');
        }

        if (errors.length) {
            notificationsDOM.classList.add('show');
            // notificationsDOM.innerHTML = errors.map(e => `<p>${e}.</p>`).join('');
            notificationsDOM.innerText = errors.join('.\n') + '.'; //jei radom klaidu - parodom
        } else {
            delete data.repass;
            delete data.tos;

            // async/await

            const response = await fetch(formDOM.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            console.log(res);
        }

        // tikriname ar laukai ne tusti
        // tikriname ar geros vertes:
        //      ar vardas "tinkamas" (minimum 2 zodziai)
        //      ar email "tinkamas"
        //      ar password "tinkamas"
        //      ar repeat-password "tinkamas"
        //      ar password === repeat-password
        //      ar TOS pazymetas (check)
        //  JEI yra klaidu:
        //      klaidas atvaizduojame pranesimu bloke
        //  JEI klaidu nera:
        //      sekmes pranesima atvaizduojame pranesimu bloke

        // siunciam i backend'a (API)
        //      JEI grazino klaida
        //          klaidas atvaizduojame pranesimu bloke
        //      JEI klaidu nera:
        //          sekmes pranesima atvaizduojame pranesimu bloke
    })
}