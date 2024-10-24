import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';

interface ChartData {
  category: string;
  value: number;
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnDestroy, AfterViewInit {
  private root!: am5.Root;
  @Input() data:[] = [];  // Data input

  ngAfterViewInit() {
    // Create root element
    this.root = am5.Root.new("pieChartDiv");

    // Set themes
    this.root.setThemes([am5.Theme.new(this.root)]);

    // Create pie chart
    let chart = this.root.container.children.push(am5percent.PieChart.new(this.root, {
      layout: this.root.verticalLayout // Legend below chart
    }));

    // Create series
    let series = chart.series.push(am5percent.PieSeries.new(this.root, {
      valueField: "value",
      categoryField: "category",
    }));

    // series.labels.template.set("visible", false);
    // series.ticks.template.set("visible", false);

    // Add animation to the series
    series.appear(1000, 100);

    // Add data
    series.data.setAll(this.data
  );

    // Create legend
    let legend = chart.children.push(am5.Legend.new(this.root, {
      layout: this.root.gridLayout,    // Set layout to grid
      centerX: am5.percent(50),        // Center the legend horizontally
      x: am5.percent(50),              // Align legend to center
    }));

    legend.data.setAll(series.dataItems);

    // Set legend item template for responsiveness
    legend.itemContainers.template.setAll({
      width: am5.percent(50),          // 50% width for 2 items per row
      marginBottom: 10                 // Add some margin between rows
    });

    legend.labels.template.setAll({
      fontSize: 14,                    // Default font size for legend labels
      fill: am5.color(0x000000)        // Black color for text
    });

    legend.valueLabels.template.setAll({
      fontSize: 14,                    // Default font size for legend values
      fill: am5.color(0x000000)        // Black color for value text
    });

    // Responsive logic for the chart and legend
    const adjustLayout = () => {
      const width = window.innerWidth;

      if (width < 600) {
        // Small screens - stack chart and legend vertically, reduce font size
        chart.set("layout", this.root.verticalLayout);
        legend.itemContainers.template.set("width", am5.percent(50)); // 2x2 layout
        legend.labels.template.set("fontSize", 12); // Smaller font on small screens
        legend.valueLabels.template.set("fontSize", 12); // Smaller values font
      } else if (width < 1000) {
        // Medium screens - maintain 2x2 layout but larger font size
        chart.set("layout", this.root.verticalLayout);
        legend.itemContainers.template.set("width", am5.percent(50)); // 2x2 layout
        legend.labels.template.set("fontSize", 14); // Medium font size
        legend.valueLabels.template.set("fontSize", 14); // Medium font size for values
      } else {
        // Large screens - side-by-side chart and legend, normal font size
        chart.set("layout", this.root.verticalLayout);
        legend.itemContainers.template.set("width", am5.percent(50)); // 2x2 layout
        legend.labels.template.set("fontSize", 16); // Larger font for large screens
        legend.valueLabels.template.set("fontSize", 16); // Larger values font
      }
    };

    // Call the function initially
    adjustLayout();

    // Adjust layout when window resizes
    window.addEventListener("resize", adjustLayout);

    // Make the chart full-width responsive
    this.root.events.on("frameended", () => {
      this.root.container.children.each(child => {
        child.set("width", am5.percent(100));
      });
    });
  }

  ngOnDestroy() {
    // Clean up the chart to prevent memory leaks
    if (this.root) {
      this.root.dispose();
    }
  }
}





// import { Component, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';
// import * as am5 from "@amcharts/amcharts5";
// import * as am5percent from "@amcharts/amcharts5/percent";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// @Component({
//   selector: 'app-pie-chart',
//   standalone: true,
//   templateUrl: './pie-chart.component.html',
//   styleUrls: ['./pie-chart.component.scss']
// })
// export class PieChartComponent implements OnInit, OnDestroy {
//   private root!: am5.Root;
//   @Input() data: any[] = [];  // Data input

//   constructor(private elementRef: ElementRef) {}

//   ngOnInit(): void {
//     this.createChart();
//   }

//   createChart(): void {
//     // Create root element
//     this.root = am5.Root.new(this.elementRef.nativeElement.querySelector("#chart-container"));

//     // Apply themes
//     this.root.setThemes([am5themes_Animated.new(this.root)]);

//     // Create a container to hold both the chart and the legend
//     let mainContainer = this.root.container.children.push(
//       am5.Container.new(this.root, {
//         layout: this.root.verticalLayout,  // Layout for side-by-side chart and legend
//         width: am5.percent(100),
//         height: am5.percent(100),
//       })
//     );

//     // Chart container (left side, 70% width)
//     let chartContainer = mainContainer.children.push(
//       am5.Container.new(this.root, {
//         width: am5.percent(100),  // Set the chart container width
//         height: am5.percent(100),
//       })
//     );

//     // Create the Pie Chart
//     let chart = chartContainer.children.push(
//       am5percent.PieChart.new(this.root, {
//         layout: this.root.horizontalLayout,
//       })
//     );

//     // Create Pie Series
//     let series = chart.series.push(
//       am5percent.PieSeries.new(this.root, {
//         name: "Series",
//         valueField: "value",
//         categoryField: "category",
//       })
//     );

//     // Add data to series
//     if (this.data && this.data.length) {
//       series.data.setAll(this.data);  // Set parsed data
//     } else {
//       console.error("No data available for the pie chart");
//     }

//     // Disable slice labels and ticks
//     series.labels.template.set("visible", false);
//     series.ticks.template.set("visible", false);

//     // Legend container (right side, 30% width)
//     let legendContainer = mainContainer.children.push(
//       am5.Container.new(this.root, {
//         width: am5.percent(70),  // Set the legend container width
//         height: am5.percent(100),
//         layout: this.root.gridLayout,

//       })
//     );

//     // Create the legend
//     let legend = legendContainer.children.push(
//       am5.Legend.new(this.root, {
//         layout: this.root.gridLayout,    // Set layout to grid
//         centerY: am5.percent(0),  // Center vertically within the container
//         centerX: am5.percent(50),
//         x: am5.percent(70),
//         marginLeft: 20
//       })
//     );

//     // Link the legend with the data
//     legend.data.setAll(series.dataItems);

//     legend.labels.template.setAll({
//       fontSize: "15px",          // Set the font size
//       fontFamily: "sans-serif",  // Set the font family
//       fill: am5.color(0x4e4e4e), // Set the font color (hex or AMCharts color)
//       fontWeight: "bold",        // Set the font weight (normal, bold, etc.)
//     });

//     function adjustLegendStyle() {
//       if (window.innerWidth < 600) {
//         legend.labels.template.setAll({
//           fontSize: 10,
//         });
//       } else {
//         legend.labels.template.setAll({
//           fontSize: 16,
//         });
//       }
//     }
    
//     window.addEventListener("resize", adjustLegendStyle);
//     adjustLegendStyle();

//     // function adjustLayout() {
//     //   if (window.innerWidth < 600) {
//     //     chart.set("layout", root.verticalLayout); // Stack the chart and legend
//     //   } else {
//     //     chart.set("layout", root.horizontalLayout); // Keep them side by side
//     //   }
//     // }
    
//     // // Call function initially
//     // adjustLayout();
    
//     // // Adjust layout when window resizes
//     // window.addEventListener("resize", adjustLayout);

//     series.appear(1000, 100);
//   }

//   ngOnDestroy(): void {
//     if (this.root) {
//       this.root.dispose();
//     }
//   }
// }
