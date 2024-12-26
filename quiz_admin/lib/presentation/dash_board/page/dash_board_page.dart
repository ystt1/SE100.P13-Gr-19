import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:quiz_admin/presentation/dash_board/widgets/answer_ratio.dart';
import 'package:quiz_admin/presentation/dash_board/widgets/new_user_chart.dart';
import 'package:quiz_admin/presentation/dash_board/widgets/topic_chart.dart';

class DashBoardPage extends StatefulWidget {
  const DashBoardPage({super.key});

  @override
  State<DashBoardPage> createState() => _DashBoardPageState();
}

class _DashBoardPageState extends State<DashBoardPage> {
  // Mock data



  final List<double> answerTrends = [5, 10, 15, 20, 25];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                "Số người dùng mới hàng tháng",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),

            NewUserChart(),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                "Tỉ lệ câu trả lời đúng tháng này",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            AnswerRatio(),

            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                "Tỉ lệ sử dụng các chủ đề",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            TopicChart(),

            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                "Xu hướng tổng số câu trả lời",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            Container(
              height: 300,
              padding: const EdgeInsets.all(8.0),
              child: LineChart(
                LineChartData(
                  lineBarsData: [
                    LineChartBarData(
                      spots: [
                        for (int i = 0; i < answerTrends.length; i++)
                          FlSpot(i.toDouble(), answerTrends[i]),
                      ],
                      isCurved: true,
                      color: Colors.blue,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}