import { Component, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  @Input() data: any[] = [];  // Data input

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    // Create root element
    this.root = am5.Root.new(this.elementRef.nativeElement.querySelector("#chart-container"));

    // Apply themes
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // Create a container to hold both the chart and the legend
    let mainContainer = this.root.container.children.push(
      am5.Container.new(this.root, {
        layout: this.root.verticalLayout,  // Layout for side-by-side chart and legend
        width: am5.percent(100),
        height: am5.percent(100),
      })
    );

    // Chart container (left side, 70% width)
    let chartContainer = mainContainer.children.push(
      am5.Container.new(this.root, {
        width: am5.percent(100),  // Set the chart container width
        height: am5.percent(100),
      })
    );

    // Create the Pie Chart
    let chart = chartContainer.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.horizontalLayout,
      })
    );

    // Create Pie Series
    let series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        name: "Series",
        valueField: "value",
        categoryField: "category",
      })
    );

    // Add data to series
    if (this.data && this.data.length) {
      series.data.setAll(this.data);  // Set parsed data
    } else {
      console.error("No data available for the pie chart");
    }

    // Disable slice labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Legend container (right side, 30% width)
    let legendContainer = mainContainer.children.push(
      am5.Container.new(this.root, {
        width: am5.percent(70),  // Set the legend container width
        height: am5.percent(100),
        layout: this.root.gridLayout,

      })
    );

    // Create the legend
    let legend = legendContainer.children.push(
      am5.Legend.new(this.root, {
        layout: this.root.gridLayout,    // Set layout to grid
        centerY: am5.percent(0),  // Center vertically within the container
        centerX: am5.percent(50),
        x: am5.percent(70),
        marginLeft: 20
      })
    );

    // Link the legend with the data
    legend.data.setAll(series.dataItems);

    legend.labels.template.setAll({
      fontSize: "15px",          // Set the font size
      fontFamily: "sans-serif",  // Set the font family
      fill: am5.color(0x4e4e4e), // Set the font color (hex or AMCharts color)
      fontWeight: "bold",        // Set the font weight (normal, bold, etc.)
    });

    function adjustLegendStyle() {
      if (window.innerWidth < 600) {
        legend.labels.template.setAll({
          fontSize: 10,
        });
      } else {
        legend.labels.template.setAll({
          fontSize: 16,
        });
      }
    }
    
    window.addEventListener("resize", adjustLegendStyle);
    adjustLegendStyle();

    // function adjustLayout() {
    //   if (window.innerWidth < 600) {
    //     chart.set("layout", root.verticalLayout); // Stack the chart and legend
    //   } else {
    //     chart.set("layout", root.horizontalLayout); // Keep them side by side
    //   }
    // }
    
    // // Call function initially
    // adjustLayout();
    
    // // Adjust layout when window resizes
    // window.addEventListener("resize", adjustLayout);

    series.appear(1000, 100);
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
  }
}
