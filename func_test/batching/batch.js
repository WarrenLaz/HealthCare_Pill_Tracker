
var batches =      [20, 30, 60, 80, 10];
var currentQuant = [[20, 0], [30, 0], [60, 0], [80, 0], [10,0]];
const perDay =     [1,   2,  3,   4, 1];
const Thresh_a = 5;
const Thresh_b = 10;
const Testval = 200;

var reorder = false;

const Batching = (req, res = []) => {

    for(var j = 0; j < Testval; j++){
        for(var k = 0; k < currentQuant.length; k++){
            currentQuant[k][0] -= perDay[k];
            if(currentQuant[k][0]/perDay[i] < Thresh_b)
                currentQuant[k][1] = 1;
        }
        console.log(currentQuant);
        for(var i = 0; i < currentQuant.length; i++){
            if(currentQuant[i][0]/perDay[i] < Thresh_a){
                reorder = true
                break;
            }
        }
        if(reorder == true){
            for(var x = 0; x < currentQuant.length; x++){
                if(currentQuant[x][1] == 1){
                    currentQuant[x][0] += batches[x];
                    currentQuant[x][1] = 0;
                }
            }
        }
        
    }
    return res
}

console.log(Batching(1))