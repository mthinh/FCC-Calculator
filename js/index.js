$(document).ready(function(){
  var onLoad=false;
  var dataController= (function(){
    var data = [];

    //public zone
    return{
      //Store val function 
      storeValue:function(val){
        data.push(val);
        console.log(data);
      },

      testing:function(){
        console.log(data);
        return data;
      },

      testing1:function(){
        console.log(data);
      },

      popValue:function(){
        data.pop();  
      },

      reset:function(){
        data.splice(0,data.length);
        console.log(data);
      },

      calculateResult:function(data){
        var resultStr,result;
        resultStr = data.join('');

        try{
          eval(resultStr);
        } catch(err){
          $('#screen-2').text('Syntax Error');
        }
        result = eval(resultStr);
        return result;
      }
    }//end of return
  })();



  var UIController = (function(){
    return{
      displayInput:function(data){

        $('#screen-1').text(data.join(''));

      },
      reset:function(){
        $('#screen-1').text('0');    
        $('#screen-2').text('0');  
      },

      displayResult:function(result){
        $('#screen-2').text(result.toFixed(2));
      }
    }

  })();


  var controller = (function(dataCtrl,UICtrl){

    var startEvent = function(){


      //Get value when hit button 
      $('button').click(function(){
        var value; 
        // onLoad = false;
        value = $(this).val();
        console.log(value);
        var data = dataCtrl.testing();
        if(data.length < 10){
          if(data.length >=0 && data[0] !== '/100' && data[0] !== '*' && data[0] !== '/' && data[0] !=='.'){
            //Base on value => decide what to do 
            if(value !== 'AC' && value !== 'CE' && value !=='cal' ){
              if(onLoad){
                if(value !== '+' && value !== '-' && value !=='*' && value !=='/' && value !== '/100'){
                  dataCtrl.reset();
                  dataCtrl.storeValue(value);
                  UICtrl.displayInput(data);
                }else{
                  dataCtrl.storeValue(value);
                  UICtrl.displayInput(data);

                }
                onLoad = false;
              }else{
                dataCtrl.storeValue(value);
                UICtrl.displayInput(data);
              }




            }else if(value === 'AC'){
              let data = dataCtrl.testing();
              //1.reset all in data
              dataCtrl.reset(data);
              //2.display
              UICtrl.reset();
            }else if(value === 'CE'){
              let data = dataCtrl.testing();
              //1. pop up the last value
              dataCtrl.popValue();
              //2.display
              UICtrl.displayInput(data);
              console.log(data);
              if(data.length ===0){
                UICtrl.reset();
              }
            }else if(value ==='cal'){
              showResult();
              // console.log(data[0]);
              onLoad = true;
              // console.log(onLoad);
            }

          }else{
            if(value === 'AC'){
              let data = dataCtrl.testing();
              //1.reset all in data
              dataCtrl.reset(data);
              //2.display
              UICtrl.reset();
            }else if(value ==='cal'){
              $('#screen-2').text('Syntax error');
            }
          }
        }else{
          dataCtrl.reset();
          UICtrl.reset();
        }







      });
    }



    var showResult = function(){
      let data,result 
      data = dataCtrl.testing();
      //1.Calculate
      result= dataCtrl.calculateResult(data);

      //2.Show the result
      UICtrl.displayResult(result);
      //3.Delete phép tính cũ trong array
      dataCtrl.reset();
      $('#screen-1').text('0');
      //4.Store result back to array
      dataCtrl.storeValue(result);

    };





    return{
      init: function(){
        startEvent();
        // console.log(onLoad);
      }
    };

  })(dataController,UIController);

  controller.init();



});