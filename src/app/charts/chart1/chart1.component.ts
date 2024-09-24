import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-chart1',
  standalone: true,
  imports: [],
  templateUrl: './chart1.component.html',
  styleUrl: './chart1.component.scss'
})
export class Chart1Component implements OnInit, OnDestroy {

  private root!: am5.Root; 
  ngOnInit(): void {
    this.root = am5.Root.new("chartdiv");
    this.root.setThemes([am5themes_Animated.new(this.root)]);
    let chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      })
    );

    // Create X axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(this.root, {})
      })
    );

    // Create Y axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    // Create a series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category"
      })
    );

    // Add data
    series.data.setAll([
      { category: "A", value: 25 },
      { category: "B", value: 20 },
      { category: "C", value: 30 },
    ]);

    // Set X axis data
    xAxis.data.setAll([
      { category: "A" },
      { category: "B" },
      { category: "C" },
    ]);
  }

  ngOnDestroy(): void {
    // Dispose of the chart when the component is destroyed
    if (this.root) {
      this.root.dispose();
    }
  }
}
