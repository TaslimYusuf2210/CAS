import { Component, OnDestroy, OnInit, ElementRef, Input } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  @Input()data:any

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Create root element and chart
    this.root = am5.Root.new(this.elementRef.nativeElement.querySelector("#piechart"));

    // Set themes
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Create chart
    let chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        name: "Series",
        valueField: "value",
        categoryField: "category"
      })
    );

    // Set data
    series.data.setAll(this.data);

    // Animate chart
    series.appear(1000, 100);
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
  }
}
