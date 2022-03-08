const customer = document.querySelector(".customer")
const heads = ['name', 'adress', 'age']
fBtn = document.querySelector("#fBtn")
          fBtn.innerText="add"
const readData = (storageKey) => {
    let data = []
    try {
        data = JSON.parse(localStorage.getItem(storageKey)) || []
        if (!Array.isArray(data)) throw new Error("is not array")
    } catch (e) {
        data = []
    }
    return data
}
const writeData = (data, storageKey) => {
    localStorage.setItem(storageKey, JSON.stringify(data))
}
const submitForm = function (e) {
    e.preventDefault()
    let customers = {id:5}
    heads.forEach(head => {
        customers[head] = this.elements[head].value
    })
    const customer_data = readData("customer")
    customer_data.push(customers)
    writeData(customer_data, "customer")
    this.reset()
    // window.location.href = "show.html"
    // location.reload()
}

const tableBody = document.querySelector('.body');
const body_show = document.querySelector('.body-show');
function showAll() {
    tableBody.innerHTML = ""
    const createEl = (parent, elemnt, txt, classes,toggle=null,target=null) => {
        const el = document.createElement(elemnt)
        parent.appendChild(el)
        if (txt) el.innerText = txt
        if (classes) el.className = classes
        if (toggle) el.dataset.bsToggle = toggle
        if (target) el.dataset.bsTarget = target
        return el
    }

    const cust = readData("customer")
    
    cust.forEach((custom, index) => {
       
        const num = Math.ceil(Math.random() * (Date.now()));
        const nnum = num.toString()
        const tr = createEl(tableBody, "tr", null, null)
        createEl(tr, 'td', index + 1, null)
        createEl(tr, 'td',nnum, null)

        heads.forEach(head => createEl(tr, "td", custom[head], null))
        const action = createEl(tr, "td", null, null)
        const showBtn = createEl(action, 'button', 'show', 'btn btn-primary m-r-1em','modal','#exampleModal')
        const editBtn = createEl(action, 'button', 'Edit', 'btn btn-warning m-r-1em')
        const deleteBtn = createEl(action, 'button', 'Delete', 'btn btn-danger m-r-1em')

        // Delete Data
        deleteBtn.addEventListener('click', () => {
            cust.splice(index, 1)
            writeData(cust, "customer")
            showAll()
        })
        
        // Show Data
        showBtn.addEventListener('click',(e)=>{
            e.preventDefault();
            body_show.innerHTML = ""
            // const show_arr = []
            // show_arr.push(cust[index])
            const tr_show = createEl(body_show, "tr", null, null)
            createEl(tr_show, 'td', index + 1, null)
            createEl(tr_show, 'td',nnum, null)
            createEl(tr_show, "td", cust[index]['name'], null)
            createEl(tr_show, "td", cust[index]['adress'], null)
            createEl(tr_show, "td", cust[index]['age'], null)
            showAll()
            // location.reload();
            // console.log(cust[index]);
        })

        editBtn.addEventListener('click', function (e){
          const edit_cust =  readData("customer")
          fBtn = document.querySelector("#fBtn")
          fBtn.textContent="edit"
          heads.forEach(head=>{
            customer.elements[head].value = edit_cust[index][head]; }) 
          localStorage.setItem("formType", "edit")
          console.log(fBtn.textContent)
          customer.addEventListener('submit',function (e) {
              e.preventDefault()
              heads.forEach(head => {
                  edit_cust[index][head] = e.target.elements[head].value
              })
              console.log(edit_cust[index])
              // writeData(edit_cust, "customer")
              // this.reset()
              // window.location.href = "show.html"
              // location.reload()
          // })
      })
  
  
            // console.log();
            // e.preventDefault()
            // =  cust[index]['name']
            // let customers = {}
            // heads.forEach(head => {
            //    console.log(this.elements[head].value);
            // })
            // const customer_data = readData("customer")
            // customer_data.push(customers)
            // writeData(customer_data, "customer")
            // this.reset()
            // // window.location.href = "show.html"
            // location.reload()
        })
    })

}

if (customer){
    if(fBtn.textContent=="add"){
        console.log(fBtn.textContent)
        customer.addEventListener("submit", submitForm);
    }
    else {
        console.log(fbn.textContent)
        customer.addEventListener('submit',function (e) {
            e.preventDefault()
            heads.forEach(head => {
                edit_cust[index][head] = e.target.elements[head].value
            })
            console.log(edit_cust[index])
            // writeData(edit_cust, "customer")
            // this.reset()
            // window.location.href = "show.html"
            // location.reload()
        // })
    })

    }
}
if (tableBody) showAll()