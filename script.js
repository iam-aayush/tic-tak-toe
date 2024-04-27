const game_container = document.querySelector('.game-comtainer')
const reset = document.querySelector('.reset')

let hash ={}

let xChance = true
let allFilled = 0

game_container.addEventListener('click' , (e)=>{

    
   if(e.target.dataset.index){
        if(!hash[e.target.dataset.index]) {
            if(xChance){
                hash[e.target.dataset.index] = 'X'
                e.target.classList.add('x')
            }else {
                hash[e.target.dataset.index] = 'O'
                e.target.classList.add('o')
            }

            xChance = !xChance
            allFilled++

            let result = checkWin()
            if(allFilled == 9 || result.includes('Won')){
                document.querySelector('.result').textContent = result;
                game_container.style.pointerEvents = "none";
            }
        }


   }
} )


reset.addEventListener('click' ,(e)=>{
    const cells = document.querySelectorAll('.cell')

    cells.forEach((val)=>{
      
        if(val.classList.contains('x')){
            val.classList.remove('x')
        }else if(val.classList.contains('o')){
            val.classList.remove('o')
        }
    })

    hash = {}
    allFilled = 0
    xChance = true
    document.querySelector('.result').textContent = ''
    game_container.style.pointerEvents = "auto";
} )






const checkWin = ()=>{

    // For row
    for(let i = 0 ; i<3 ; i++){
        let set = new Set()
        let player = ""
        for(let j=0; j<3 ; j++){
            let key = `${i}-${j}`
            set.add(hash[key])
            console.log(set);
            player = hash[key] ;
        }

       if(set.size == 1 && player ){
        return `Player ${player} Won`
       }
    }

    // For Column
    for(let j = 0 ; j<3 ; j++){
        let set = new Set()
        let player = ""
        for(let i=0; i<3 ; i++){
            let key = `${i}-${j}`
            set.add(hash[key])
            player = hash[key] ;
        }
       if(set.size == 1 && player ){
        return `Player ${player} Won`
       }
    }

    // For Diagonal 

    let i = 0 , j = 0
    let set = new Set()
    let player = ''
    while(i<3 && j<3) {
        let key = `${i}-${j}`
        set.add(hash[key])
        player = hash[key] ;
        i++
        j++
    }
    if(set.size == 1 && player ){
        return `Player ${player} Won`
       }

       //For Anti-Diagonal
       (i= 0 ) ,(j=2)
       set.clear()
       while(i<3 && j>= 0) {
        let key = `${i}-${j}`
        set.add(hash[key])
        player = hash[key] ;
        i++
        j--
       }
       
       if(set.size == 1 && player ){
        return `Player ${player} Won`
       }

       return "Match Draw"
}