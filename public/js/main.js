const productTable = document.getElementById('productTable');
var category = document.getElementById('category')
var description = document.getElementById('description')
var amount = document.getElementById('amount')
const elecTable = document.getElementById('elecTable');

async function addProduct(e) {
    try {
        e.preventDefault();
        if (category.value == "" || description.value == "" || amount.value == "") {
            alert('Please fill all the details')
        }
        else {
            const obj = {
                category: category.value,
                description: description.value,
                amount: amount.value
            }
            const res = await axios.post('http://localhost:3000/home/post', obj)
            showData(res.data.data)
            category.value = '';
            description.value = '';
            amount.value = '';

        }
    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('http://localhost:3000/home/getProducts')
        for (let i = 0; i < res.data.data.length; i++) {
            showData(res.data.data[i]);

        }
    }
    catch (err) {
        console.log(err);
    }
})

function showData(data) {
    if (data.category === 'Personal') {
        let text = `<p id=${data.id}>
                ${data.category}
                ${data.description}
                $${data.amount}
                <button onclick="editProduct(${data.id})">
                    Edit</button>
                <button class="deleteButton" onclick="deleteProduct(${data.id},${data.amount})">
                    Delete</button></p>
            `;
        productTable.innerHTML = productTable.innerHTML + text;
    }
    else if (data.category === 'Groceries') {
        let text = `<p id=${data.id}>
               ${data.category}
                ${data.description}
                $${data.amount}
                <button onclick="editProduct(${data.id})">
                    Edit</button>
              <button class="deleteButton" onclick="deleteProduct(${data.id},${data.amount})">
                    Delete</button></p>
            `;
        elecTable.innerHTML = elecTable.innerHTML + text;
    }
}

async function deleteProduct(id, amount) {
    try {
        const res = await axios.delete(`http://localhost:3000/home/delete/${id}`)
        let tr = document.getElementById(id);
        productTable.removeChild(tr);
    }
    catch (err) {
        console.log(err);
    }
}

async function editProduct(id) {
    try {
        const resp = await axios.get(`http://localhost:3000/home/getProduct/${id}`)
        category.value = resp.data.data.category;
        description.value = resp.data.data.description;
        amount.value = resp.data.data.amount;
        let tr = document.getElementById(id);
        let btn2 = document.getElementById('submitbtn')
        btn2.style.visibility = 'hidden'
        productTable.removeChild(tr);
        var btn = document.createElement('button')
        btn.appendChild(document.createTextNode('Update'))
        btn.id = "updateBtn"
        var btn1 = document.getElementById('but')
        btn1.appendChild(btn)
        btn.onclick = async () => {
            let obj = {
                category: category.value,
                description: description.value,
                amount: amount.value
            }
            const resp1 = await axios.put(`http://localhost:3000/home/updateProduct/${id}`, obj)
            btn1.removeChild(btn)
            showData(resp1.data.data)
            btn2.style.visibility = 'visible'
            category.value = '';
            description.value = '';
            amount.value = '';
        }
    }
    catch (err) {
        console.log(err);
    }
}