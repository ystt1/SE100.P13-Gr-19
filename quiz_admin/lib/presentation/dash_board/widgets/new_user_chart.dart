import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class NewUserChart extends StatefulWidget {
  const NewUserChart({super.key});

  @override
  State<NewUserChart> createState() => _NewUserChartState();
}

class _NewUserChartState extends State<NewUserChart> {
  final List<String> months = ["Jan", "Feb", "Mar", "Apr", "May"];
  final List<int> userCounts = [50, 75, 100, 150, 200];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      padding: const EdgeInsets.all(20.0),
      child: BarChart(
        BarChartData(
          barGroups: [
            for (int i = 0; i < months.length; i++)
              BarChartGroupData(
                x: i,
                barRods: [
                  BarChartRodData(
                    toY: userCounts[i].toDouble(),
                    color: Colors.blue,
                  ),
                ],
              ),
          ],
          titlesData: FlTitlesData(
            rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            leftTitles:  AxisTitles(
              axisNameWidget: Text('Number of Users'),
              sideTitles: SideTitles(showTitles: true,
                reservedSize: 50,
              ),
            ),
            bottomTitles: AxisTitles(
              axisNameWidget: const Text('Month'),
              sideTitles: SideTitles(
                reservedSize: 30,
                showTitles: true,
                getTitlesWidget: (double value, TitleMeta meta) {
                  final index = value.toInt();
                  if (index >= 0 && index < months.length) {
                    return Text(months[index],
                        style: const TextStyle(fontSize: 12));
                  }
                  return const SizedBox.shrink();
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
