//Run 'tsc' in the terminal to cast to a .js file

// Custom objects are used to define the JSON properties we care about
type Human = { firstName : string, lastName : string, title : string, gender : string, username : string, password : string, age : number, picture : string}

type Family = {
    parents : [Human, Human];
    children : Human[];
    size : number;
}

//HTML Elements
var btn : HTMLButtonElement = document.getElementById("showFamilyBtn") as HTMLButtonElement;
var container : HTMLDivElement = document.getElementById("showFamily") as HTMLDivElement;

btn.addEventListener("click", function()
{
    //AJAX Request Start
    var req = new XMLHttpRequest();

    req.open("GET", "https://randomuser.me/api/?results=15");

    req.onload = function()
    {
        var data = JSON.parse(req.responseText);
        let humans : Human[] = [];
        for (let i = 0; i < data.info.results; i++)
        {
            let h : Human = {
                firstName : data.results[i].name.first,
                lastName : data.results[i].name.last,
                title : data.results[i].name.title,
                gender : data.results[i].gender,
                username : data.results[i].login.username,
                password : data.results[i].login.password,
                age : data.results[i].dob.age,
                picture : data.results[i].picture.large
            };
            humans.push(h);
        }

        //Bubble Sort
        for (let i = 0; i < humans.length - 2; i++) 
        {
            for (let j = 0; j < humans.length - 1 - i; j++)
            {
                if (humans[j].age < humans[j + 1].age)
                {
                    let tempHuman : Human = humans[j];
                    humans[j] = humans[j + 1];
                    humans[j + 1] = tempHuman;
                }
            }
        }

        let family : Family;

        let children : Human[] = [];

        for (let i = 2; i < humans.length; i++) 
        {
            children.push(humans[i]);
        }

        family = 
        {
            parents : [humans[0], humans[1]],
            children : children,
            size : 2 + children.length
        };
        renderHTML(family);
    };


    req.send();
});


/**
 * Renders HTML based on the JSON data
 * @param family 
 * @returns void
 */
function renderHTML(family : Family) : void
{
    var htmlString : string = "";
    for (let i = 0; i < 2; i++)
    {
        htmlString += 
        `<img src = "${family.parents[i].picture}">
        <h2>Name: ${family.parents[i].title} ${family.parents[i].firstName} ${family.parents[i].lastName} (${family.parents[i].gender}) (Parent)</h2>
        <p>Age: ${family.parents[i].age}<br>
        Username: ${family.parents[i].username}<br>
        Password: ${family.parents[i].password}</p><br>`;
        console.log(htmlString);
    }

    for (let i = 0; i < family.size - 2; i++)
    {
        htmlString += 
        `<img src = "${family.children[i].picture}">
        <h3>Name: ${family.children[i].title} ${family.children[i].firstName} ${family.children[i].lastName} (${family.children[i].gender}) (Child)</h3>
        <p>Age: ${family.children[i].age}<br>
        Username: ${family.children[i].username}<br>
        Password: ${family.children[i].password}</p><br>`;
        console.log(htmlString);
    }
    container.insertAdjacentHTML("beforeend", htmlString);
}