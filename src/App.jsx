//usestate - yaad rkhne ka dabba
//usestate > hook hai jaise ki ek dabba 
//usestate ko import kiya hai kind of a power 
import { useState, useEffect } from "react";
import './App.css'

function App(){

    //1. Shuru mein localStorage se load kro (agar kuch hai to)
    //ek baar chalega

    //DEPENDENCY ARRAY CONCEPT
    //usestate ka parameter khali mtlb keh rha hai ki mujhe koi input nhi chaiye 
    //bs jo kaam krna hai vo kr dunga jb dependency change hogi 
    //'expenses' ye bs ek key hai jo local storage me data ko store krne ke liye use hoti hai 
    //ye ek naam h jo hm data ko local storage me dete hai
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('expenses');
        return saved ? JSON.parse(saved) : []; //agar saved me kuch hai to parse krke daal do agar nhi hai to [] khali rkho
        //initial state kehte hai isse
    })

    //expenses - variable h, setExpenses - updater fn hai kuch naya aaya to put 
    //app khulega to ye sb khali rhna chahiye (default)
    //agar koi naya expense add ho rha hai to setExpenses hmara usestate[] ke through array list me expense bhar rha hai
    //aise hi saari field me data bharega

    const [expenseName, setExpenseName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('Food')

    // 2. Har baar expenses change hone pe localStorage mein save kar do
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]); // expenses jb change hoga tb tb ye fn chalega
    
    function addExpense(){
        if(expenseName.trim() === '' || Number(amount) <= 0){
            alert('Please enter valid expense details.')
            return
        }

        const newExpense = {
            //react me har list dikkhate time har item ki unique identity hoti hai 
            //to date.now() hme current ms deta h har id ka aur ye unique hota hai diff id ke liye
            id: Date.now(),
            //extra space hata ke daal do
            name: expenseName.trim(),
            amount: Number(amount),
            category: category
        }

        //immutability enable krte hai ... se
        //... isse spread operator kehte hai
        //...expenses mtlb purani list jo pehle se saved thi usko copy krega fir uske last me newExpense lst ko jod dega
        setExpenses([...expenses,newExpense])
        //expense add hone ke baad sb firse black aur default pr chala jayega
        setExpenseName('')
        setAmount('')
        setCategory('Food')
    }

    function deleteExpense(id){
        //.filter() makes new array in js 
        //neeche wali line checks jiski id hmari di gyi id se match nhi kre usko array me rkho
        //jo id match ho jaye use array se delete
        setExpenses(expenses.filter(expense => expense.id !== id))
    }

    //.reduce ek function bna rha hai jisme sum initially 0 hai
    //.reduce callback fn lgata expenses array ke har element pr resulting output to be a single value
    //parameter sum, expense hai 
    //har element ke liye sum + us element ka amount basically total nikal raha hai
    // Saare expenses ke amount ka jod = total spent
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    //JSX ye screen pr dikhta hai, yha html + js use hota hai
    return(
        <div className="container">
            <h1>💰 Expense Tracker</h1>

            {/* ------------------- INPUT FORM ------------------- */}

            {/*React me className krke likhte hai*/}
            <div className="form-box">

                <input 
                type="text"
                placeholder="Expense name (e.g. Coffee)"
                value={expenseName}
                /*onChange react ka event listener h 
                    jaise js me click krne pe koi function chlta tha vaise hi react me 
                    (e) event or vo action h jo user ne kiya aur .target vo html element
                    hai jaha event ho rha hai (hmara input box) 
                    if we type c in browser e.target.value - c ho gya aur vhi box me dikhta hai*/
                onChange={(e) => setExpenseName(e.target.value)}   
                />

                <input
                type="number" 
                placeholder="Amount (e.g. 150)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />

                <select 
                /*jo selected hai vo categroy dikhegi*/
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>

                </select>

                <button 
                    className="add-btn" 
                    onClick={addExpense}
                >
                    Add Expense
                </button>
            </div>

            {/* ------------------- TOTAL SHOW ------------------- */}
            <div className="total-box">
                <h2>Total Spent: ₹{total}</h2>
            </div>

            {/* ------------------- EXPENSES LIST ------------------- */}
            <div className="list-box">
                <h3>Your Expenses</h3>
                <ul>
                    {/*yha har element jo expenses list me hai
                    use expense parameter de rhe hai expense koi variable nhi hai bs parameter ka naam h
                    jo kuch kuch jagah use ho rha hai*/}
                    {expenses.map((expense) =>(
                        <li key={expense.id}>
                            <span>
                                {expense.name} - ₹{expense.amount} ({expense.category})
                            </span>
                            <button
                            className="delete-btn"
                            onClick={() => deleteExpense(expense.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
} 
export default App