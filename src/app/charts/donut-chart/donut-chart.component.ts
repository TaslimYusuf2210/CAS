import { Component, AfterViewInit, NgZone, OnDestroy, Input } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  standalone: true
})
export class DonutChartComponent implements AfterViewInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5percent.PieChart;
  private series!: am5percent.PieSeries;
  private legend!: am5.Legend;

  @Input() data: any[] = [];  // Data input


  constructor(private zone: NgZone) {}

  createChart() {
    // Create root element
    this.root = am5.Root.new('donutchart');

    // Set themes
    this.root.setThemes([am5themes_Animated.new(this.root)]);
    
    
    // Create chart
    this.chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(50), // Donut chart
      })
    );

    // Create series
    this.series = this.chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false, // No labels inside
      })
    );

    // Add data
    this.series.data.setAll(this.data
      // [
      // { category: 'Male', value: 60 },
      // { category: 'Female', value: 40 }
      // ]
  );

    // Add legend
    this.legend = this.chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: this.root.verticalLayout // Legend under the chart
      })
    );
    this.legend.data.setAll(this.series.dataItems);

    // Remove labels and ticks
    this.series.labels.template.set('visible', false);
    this.series.ticks.template.set('visible', false);

    // Animate series
    this.series.appear(1000, 100);

    // Adjust layout initially
    this.adjustLayout();

    // Add resize event listener to adjust layout on window resize
    window.addEventListener('resize', () => {
      this.adjustLayout();
    });
  }

  adjustLayout() {
    const width = this.root.dom.offsetWidth;
    if (width < 500) {
      this.series.labels.template.setAll({ fontSize: 10 });
      this.legend.labels.template.setAll({ fontSize: 10 });
      this.legend.markers.template.setAll({ width: 10, height: 10 });
      this.legend.set('layout', this.root.verticalLayout); // Stack legend vertically
    } else {
      this.series.labels.template.setAll({ fontSize: 14 });
      this.legend.labels.template.setAll({ fontSize: 14 });
      this.legend.markers.template.setAll({ width: 15, height: 15 });
      this.legend.set('layout', this.root.horizontalLayout); // Keep legend horizontal
    }
  }

  ngAfterViewInit() {
    // Run the chart in NgZone to avoid issues with rendering
    this.zone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  ngOnDestroy() {
    // Clean up chart
    if (this.root) {
      this.root.dispose();
    }
    // Remove the resize event listener
    window.removeEventListener('resize', this.adjustLayout);
  }
}




































// import { Component, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';
// import * as am5 from "@amcharts/amcharts5";
// import * as am5percent from "@amcharts/amcharts5/percent";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// @Component({
//   selector: 'app-donut-chart',
//   standalone: true,
//   imports: [],
//   templateUrl: './donut-chart.component.html',
//   styleUrl: './donut-chart.component.scss'
// })
// export class DonutChartComponent implements OnInit, OnDestroy {
//   private root!: am5.Root;
//   @Input()data:any

//   constructor(private elementRef: ElementRef) {}

//   ngOnInit(): void {
//     // Create root element and chart
//     this.root = am5.Root.new(this.elementRef.nativeElement.querySelector("#donutchart"));

//     // Set themes
//     this.root.setThemes([
//       am5themes_Animated.new(this.root)
//     ]);

//     // Create chart
//     let chart = this.root.container.children.push(
//       am5percent.PieChart.new(this.root, {
//         layout: this.root.verticalLayout
//       })
//     );

//     // Create series
//     let series = chart.series.push(
//       am5percent.PieSeries.new(this.root, {
//         name: "Series",
//         valueField: "value",
//         categoryField: "category",
//         innerRadius: am5.percent(50)
//       })
//     );

//     // Set data
//     series.data.setAll(this.data);

//     // Animate chart
//     series.appear(1000, 100);
//   }

//   ngOnDestroy(): void {
//     if (this.root) {
//       this.root.dispose();
//     }
//   }
// }
