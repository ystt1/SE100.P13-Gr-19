import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class TopicChart extends StatefulWidget {
  const TopicChart({super.key});

  @override
  State<TopicChart> createState() => _TopicChartState();
}

class _TopicChartState extends State<TopicChart> {
  // Mock data: Số liệu theo từng tháng cho mỗi chủ đề
  final List<String> months = ["Jan", "Feb", "Mar", "Apr"];
  final Map<String, List<int>> topicMonthlyUsage = {
    "Math": [30, 40, 50, 20],
    "Science": [20, 25, 30, 15],
    "History": [10, 15, 20, 5],
    "Art": [5, 10, 15, 10],
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      padding: const EdgeInsets.all(8.0),
      child: LineChart(
        LineChartData(
          gridData: FlGridData(show: true),
          titlesData: FlTitlesData(
            leftTitles: AxisTitles(
              axisNameWidget: const Text('Topics'),
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (double value, TitleMeta meta) {
                  final index = value.toInt();
                  if (index >= 0 && index < topicMonthlyUsage.keys.length) {
                    return Text(
                      topicMonthlyUsage.keys.elementAt(index),
                      style: const TextStyle(fontSize: 12),
                    );
                  }
                  return const SizedBox.shrink();
                },
                reservedSize: 50,
              ),
            ),
            rightTitles: const AxisTitles(),
            topTitles: const AxisTitles(),
            bottomTitles: AxisTitles(
              axisNameWidget: const Text('Month'),
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 30,
                getTitlesWidget: (double value, TitleMeta meta) {
                  final index = value.toInt();
                  if (index >= 0 && index < months.length) {
                    return Text(
                      months[index],
                      style: const TextStyle(fontSize: 12),
                    );
                  }
                  return const SizedBox.shrink();
                },
              ),
            ),
          ),
          borderData: FlBorderData(show: true),
          lineBarsData: [
            for (int i = 0; i < topicMonthlyUsage.keys.length; i++)
              LineChartBarData(
                spots: [
                  for (int j = 0; j < months.length; j++)
                    FlSpot(j.toDouble(), topicMonthlyUsage.values.elementAt(i)[j].toDouble()),
                ],
                isCurved: true,
                barWidth: 3,
                color: Colors.primaries[i % Colors.primaries.length],
                dotData: FlDotData(show: true),
              ),
          ],
        ),
      ),
    );
  }
}
