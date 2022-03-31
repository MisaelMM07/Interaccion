//Primera Grafica de google

google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(grafica);

      function grafica() {
        var data = google.visualization.arrayToDataTable([
          ['Año', 'Ventas', 'Gastos'],
          ['2017',  1000,      400],
          ['2018',  1170,      460],
          ['2019',  660,       1120],
          ['2022',  1030,      300],
          ['2023',  2060,      600]
        ]);

        var options = {
          title: 'Desempeño de la compañía',
          width: 800,
          hAxis: {title: 'Año',  titleTextStyle: {color: '#222'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('primergrafico'));
        chart.draw(data, options);
      }

      //Segunda Grafica de google
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(drawTrendlines);
      
      function drawTrendlines() {
            var data = new google.visualization.DataTable();
            data.addColumn('timeofday', 'Hora del día');
            data.addColumn('number', 'Nivel de Motivación');
            data.addColumn('number', 'Nivel de energía');
      
            data.addRows([
              [{v: [8, 0, 0], f: '8 am'}, 1, .25],
              [{v: [9, 0, 0], f: '9 am'}, 2, .5],
              [{v: [10, 0, 0], f:'10 am'}, 3, 1],
              [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
              [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
              [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
              [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
              [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
              [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
              [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
            ]);
      
            var options = {
              title: 'Motivación y nivel de energía a lo largo del día',
              width: 800,
              trendlines: {
                0: {type: 'linear', lineWidth: 5, opacity: .3},
                1: {type: 'exponential', lineWidth: 10, opacity: .3}
              },
              hAxis: {
                title: 'Hora del día',
                format: 'h:mm a',
                viewWindow: {
                  min: [5, 20, 0],
                  max: [17, 30, 0]
                }
              },
              vAxis: {
                title: 'Clasificación (Escala de 1-10)'
              }
            };
      
            var chart = new google.visualization.ColumnChart(document.getElementById('segundografico'));
            chart.draw(data, options);
          }
      //Tercer Grafico
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(pacman);
      function pacman() {
        
        var data = google.visualization.arrayToDataTable([
          ['Pac Man', 'Percentage'],
          ['', 75],
          ['', 25]
        ]);

        var options = {
          title: 'Pac Man',
          width: 800,
          legend: 'none',
          pieSliceText: 'none',
          pieStartAngle: 130,
          tooltip: { trigger: 'none' },
          slices: {
            0: { color: '#F7DC6F' },
            1: { color: 'transparent' }
          }
        };

        var chart = new google.visualization.PieChart(document.getElementById('pacman'));
        chart.draw(data, options);
      }
      //Cuarto Grafico
      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Nombre');
        data.addColumn('number', 'Salario');
        data.addColumn('boolean', 'Empleado a tiempo completo');
        data.addRows([
          ['Jonathan',  {v: 10000, f: '$10,000'}, true],
          ['Miguel',   {v:8000,   f: '$8,000'},  false],
          ['Ivan', {v: 12500, f: '$12,500'}, true],
          ['Adolfo',   {v: 7000,  f: '$7,000'},  true]
        ]);

        var table = new google.visualization.Table(document.getElementById('cuartografico'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }

      //Quinto Grafico
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ["Element", "Density", { role: "style" } ],
          ["Copper", 8.94, "#b87333"],
          ["Silver", 10.49, "silver"],
          ["Gold", 19.30, "gold"],
          ["Platinum", 21.45, "color: #e5e4e2"]
        ]);
  
        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                         { calc: "stringify",
                           sourceColumn: 1,
                           type: "string",
                           role: "annotation" },
                         2]);
  
        var options = {
          title: "Density of Precious Metals, in g/cm^3",
          width: 600,
          height: 400,
          bar: {groupWidth: "95%"},
          legend: { position: "none" },
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
        chart.draw(view, options);
    }
      //Sexto Grafico
      google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Nombre');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
          [{'v':'Misael', 'f':'Misael<div style="color:red; font-style:italic">Administrador</div>'},
           '', 'The President'],
          [{'v':'Jim', 'f':'David<div style="color:red; font-style:italic">Vice Presidente</div>'},
           'Misael', 'VP'],
          ['Alice', 'Misael', ''],
          ['Bob', 'Jim', 'Bob Sponge'],
          ['Carol', 'Bob', '']
        ]);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('sextografico'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {'allowHtml':true});
      }
      