import 'package:flutter/material.dart';
import 'package:quiz_admin/presentation/dash_board/page/dash_board_page.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(
          child: Row(
        children: [
          Expanded(
              child: SingleChildScrollView(
                child: Column(
                            children: [
                DrawerHeader(child: Text('Admin')),
                ListTile(
                  leading: Icon(Icons.dashboard),
                  title: Text('Dashboard'),
                
                ),
                ListTile(
                  leading: Icon(Icons.question_answer),
                  title: Text('Manage Questions'),
                
                ),
                ListTile(
                  leading: Icon(Icons.topic),
                  title: Text('Manage Topics'),
                
                ),
                ListTile(
                  leading: Icon(Icons.person),
                  title: Text('Manage Users'),
                
                ),
                ListTile(
                  leading: Icon(Icons.bar_chart),
                  title: Text('Reports'),
                ),
                            ],
                          ),
              )),
          Expanded(
              flex: 5,
              child: DashBoardPage())
        ],
      )),
    );
  }
}
