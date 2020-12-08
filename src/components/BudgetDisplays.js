import ReactApexChart from 'react-apexcharts';
import { buildPath } from '../functions/buildPath';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Slider from 'react-input-slider';
import { ProgressBar } from 'react-bootstrap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-navigation';

export default class BudgetDisplays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      show: false,
      currentBudget: -1,
      rerender: false,
      changeAllowance: false
    }
  }

  componentDidMount() {
    var obj = {email: AsyncStorage.getItem("email")};
    var js = JSON.stringify(obj);
    Promise.all([
      fetch(buildPath('api/showAllBudgets'),
      {method:'POST', body: js, headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}}),
      fetch(buildPath('api/getAllowance'),
        {method:'POST', body: js, headers: {'Content-Type': 'application/json'}})    
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()])
      })
      .then(([res1, res2]) => {
        var total = 0;
        for (var i = 0; i < res1.results.length; i++)
          total += (res1.results[i].BudgetGoal - res1.results[i].BudgetProgress);
        this.setState({
          budgets: res1.results,
          allowance: res2.allowance,
          diff : 0,
          index: -1, 
          total : total
        })
      })
    }

  render() {
    const { budgets, show, currentBudget, allowance, diff, index, total } = this.state;
    var newName = '', newGoal ='';

    const handleClose = () => this.setState({show: false});
    const handleShow = async event => {
      event.preventDefault();
      const index = event.currentTarget.getAttribute("data-id");
      this.setState({show: true, currentBudget: index, name:budgets[index].name});
    }

//   const deleteBudget = async event => {
//         if (event !== undefined)
//           event.preventDefault();
//         var id = budgets[currentBudget]._id;
//         var obj = {_id: id};
//         var js = JSON.stringify(obj);

//             try
//             {
//             // Call to API

//             Promise.all([
//               fetch(buildPath('api/removebudget'),
//               {method:'POST', body: js, headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}}),
//               fetch(buildPath('api/add'),
//                 {method:'POST', body: js, headers: {'Content-Type': 'application/json'}})    
//             ])
//               .then(([res1, res2]) => {
//                 return Promise.all([res1.json(), res2.json()])
//               })
//               .then(([res1, res2]) => {

//     //         const response = await fetch(buildPath('api/removebudget'),
//     //             {method:'DELETE',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

//     //         // Parsing response
//     //             var txt = await response.text();
//     //             var res = JSON.parse(txt);

//     //             if( res.error.length > 0 )
//     //             {
//     //                 alert( "API Error:" + res.error );
//     //             }
//     //             else
//     //             {
//     //             window.location.href = "/budget"
//     //             }
//     //         }
//               }
//             catch(e)
//             {
//                 alert(e.toString());
//             }

//   };

  const deleteBudget2 = async event => {
    if (event !== undefined)
      event.preventDefault();
    var id = budgets[event.currentTarget.getAttribute("data-index")]._id; 
    var obj = {_id: id};
    var js = JSON.stringify(obj);

        try
        {
        // Call to API

        const response = await fetch(buildPath('api/removebudget'),
            {method:'DELETE',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

        // Parsing response
            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                alert( "API Error:" + res.error );
            }
            else
            {
            //window.location.href = "/budget"
            }
        }
        catch(e)
        {
            alert(e.toString());
        }

};

      const remove = event => {
      handleClose();
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this budget?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteBudget()
          },
          {
            label: 'No',
            onClick: () => this.setState({show: true, currentBudget: event.currentTarget.getAttribute("data-id")})
          }
        ]
      });
    };

    const updateBudget = async event => {
      event.preventDefault();

      var obj = {BudgetName: newName, BudgetGoal: newGoal,
        _id:event.currentTarget.getAttribute("data-id")};
      var js = JSON.stringify(obj);

          try
          {
          // Call to API

          const response = await fetch(buildPath('api/updatebudget'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}});

          // Parsing response
              var txt = await response.text();
              var res = JSON.parse(txt);

              if( res.error.length > 0 )
              {
                  alert( "API Error:" + res.error );
              }
              else
              {
              this.setState({index: -1});
              //
              }
          }
          catch(e)
          {
              alert(e.toString());
          }
    }

    const addProgress = async event => {
      event.preventDefault();

      if (allowance + diff < 0) {
        Alert.alert("You can't save your progress as you have a negative allowance.");
        return;
      }

      const index = event.currentTarget.getAttribute("data-index");
      var obj = {email: AsyncStorage.getItem("email"), funds: parseInt(allowance + diff)};
      var js = JSON.stringify(obj);

      const obj2 = {newAmount: budgets[index].BudgetProgress,
        _id:event.currentTarget.getAttribute("data-id")};
      const js2 = JSON.stringify(obj2);

          try
          {
          // Call to API

          Promise.all([
            fetch(buildPath('api/addAllowance'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}}),
              fetch(buildPath('api/addprogress'),
              {method:'POST',body:js2,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}})
          ]).then(([res1, res2]) => {
               return Promise.all([res1.json(), res2.json()])
            }).then(([res1, res2]) => {
            this.setState({index: -1});
           //window.location.href = "/budget";
          })
            }
          catch(e)
          {
              alert(e.toString() + "yee");
          }
    }

    return (
        <SafeAreaView>
            <Text>Budgets</Text>
        </SafeAreaView>
    );
  }
}