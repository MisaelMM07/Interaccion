// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']}); // Para cambiar el tipo de grafica

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(dibujaGrafica); //Llamadas asincronas

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function dibujaGrafica() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Champiñon', .5],
    ['Cebolla', 1],
    ['Aceitunas', 1],
    ['Queso', 3],
    ['Pepperoni', 3],
    ['Piña', .5],
    ['Jamon', .5],
    ['Frijoles', .5]
  ]);

  // Set chart options
  var options = {'title':'¿Cuanta pizza comiste anoche?',
                 'width':450,
                 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('grafica'));
  chart.draw(data, options);
}