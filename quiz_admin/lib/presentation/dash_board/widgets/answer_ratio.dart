import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class AnswerRatio extends StatefulWidget {
  const AnswerRatio({super.key});

  @override
  State<AnswerRatio> createState() => _AnswerRatioState();
}

class _AnswerRatioState extends State<AnswerRatio> {
  final double correctPercentage = 72.5;
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      padding: const EdgeInsets.all(8.0),
      child: Stack(
        children: [
          PieChart(
            PieChartData(
              sections: [
                PieChartSectionData(
                  radius: 45,
                  value: correctPercentage,
                  color: Colors.green,
                  title: "${correctPercentage.toStringAsFixed(1)}%",
                ),
                PieChartSectionData(
                  value: 100 - correctPercentage,
                  color: Colors.red,
                  title: "${(100 - correctPercentage).toStringAsFixed(1)}%",
                ),
              ],
            ),
          ),
          const Center(
            child: Positioned.fill(
                child: Text('200 answer')),
          )
        ],
      ),
    );
  }
}
