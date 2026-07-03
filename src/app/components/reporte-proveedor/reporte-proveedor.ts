import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ProveedorService } from '../../services/proveedor-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-reporte-proveedor',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        NgChartsModule,
        MenuComponent,
        MatCardHeader,
        MatCardContent,
        MatCardModule
    ],
    templateUrl: './reporte-proveedor.html',
    styleUrls: ['./reporte-proveedor.css']
})
export class ReporteProveedor implements OnInit, AfterViewInit {

    // Usar ViewChildren para capturar todos los gráficos
    @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

    // Variables para controlar si hay datos
    hasPaisData: boolean = false;
    hasEstadoData: boolean = false;
    hasMesData: boolean = false;
    hasTipoData: boolean = false;

    constructor(private service: ProveedorService) {}

    ngOnInit() {
        this.cargarPais();
        this.cargarEstado();
        this.cargarMes();
        this.cargarTipo();
    }

    ngAfterViewInit() {
        // Forzar actualización de los gráficos después de que la vista se renderice
        setTimeout(() => {
            this.updateCharts();
        }, 500); // Reducir a 500ms en lugar de 8000ms

        // También forzar actualización cuando cambie el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.updateCharts();
        });
    }

    // Método para actualizar todos los gráficos
    updateCharts() {
        if (this.charts) {
            this.charts.forEach(chart => {
                if (chart && chart.chart) {
                    chart.chart.update();
                }
            });
            console.log('Gráficos actualizados:', this.charts.length);
        }
    }

    // GRÁFICO 1: BARRAS - PROVEEDORES POR PAÍS
    barPaisData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: [{
            data: [],
            label: 'Proveedores por País',
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    barOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 13 }
                }
            },
            title: {
                display: true,
                text: 'Proveedores por País',
                font: { size: 16, weight: 'bold' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    // GRÁFICO 2: PIE - PROVEEDORES POR ESTADO
    pieEstadoData: ChartConfiguration<'pie'>['data'] = {
        labels: [],
        datasets: [{
            data: [],
            label: 'Proveedores por Estado',
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 99, 132, 0.8)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 2
        }]
    };

    pieOptions: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1, // Mantener proporción cuadrada
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 13 }
                }
            },
            title: {
                display: true,
                text: 'Distribución por Estado',
                font: { size: 16, weight: 'bold' }
            }
        }
    };

    // GRÁFICO 3: LINE - PROVEEDORES POR MES
    lineMesData: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: [{
            data: [],
            label: 'Registros por Mes',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            fill: true,
            tension: 0.4
        }]
    };

    lineOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 13 }
                }
            },
            title: {
                display: true,
                text: 'Registros por Mes',
                font: { size: 16, weight: 'bold' }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    // GRÁFICO 4: BARRA HORIZONTAL - PROVEEDORES POR TIPO
    barTipoData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: [{
            data: [],
            label: 'Cantidad por Tipo',
            backgroundColor: 'rgba(153, 102, 255, 0.7)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    horizontalBarOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 13 }
                }
            },
            title: {
                display: true,
                text: 'Cantidad por Tipo',
                font: { size: 16, weight: 'bold' }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    // MÉTODOS PARA CARGAR DATOS
    cargarPais() {
        this.service.cantidadPorPais().subscribe({
            next: (data) => {
                console.log('Datos por País:', data);
                if (data && data.length > 0) {
                    this.barPaisData.labels = data.map(item => item.pais);
                    this.barPaisData.datasets[0].data = data.map(item => item.cantidad);
                    this.hasPaisData = true;
                }
                setTimeout(() => this.updateCharts(), 100);
            },
            error: (error) => {
                console.error('Error al cargar datos por país:', error);
            }
        });
    }

    cargarEstado() {
        this.service.cantidadPorEstado().subscribe({
            next: (data) => {
                console.log('Datos por Estado:', data);
                if (data && data.length > 0) {
                    this.pieEstadoData.labels = data.map(item => item.estado);
                    this.pieEstadoData.datasets[0].data = data.map(item => item.cantidad);
                    this.hasEstadoData = true;
                }
                setTimeout(() => this.updateCharts(), 100);
            },
            error: (error) => {
                console.error('Error al cargar datos por estado:', error);
            }
        });
    }

    cargarMes() {
        this.service.cantidadPorMes().subscribe({
            next: (data) => {
                console.log('Datos por Mes:', data);
                if (data && data.length > 0) {
                    this.lineMesData.labels = data.map(item => item.mes);
                    this.lineMesData.datasets[0].data = data.map(item => item.cantidad);
                    this.hasMesData = true;
                }
                setTimeout(() => this.updateCharts(), 100);
            },
            error: (error) => {
                console.error('Error al cargar datos por mes:', error);
            }
        });
    }

    cargarTipo() {
        this.service.cantidadPorTipo().subscribe({
            next: (data) => {
                console.log('Datos por Tipo:', data);
                if (data && data.length > 0) {
                    this.barTipoData.labels = data.map(item => item.tipo);
                    this.barTipoData.datasets[0].data = data.map(item => item.cantidad);
                    this.hasTipoData = true;
                }
                setTimeout(() => this.updateCharts(), 100);
            },
            error: (error) => {
                console.error('Error al cargar datos por tipo:', error);
            }
        });
    }
}