String.prototype.format = function () {
    var formatted = this;
    for (arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

function CreateProgress(value) {
    var p = $('<div>').addClass('progress progress-striped active');
    p.attr('style', 'back-ground:#404040;');
    p.append($('<div>').addClass('bar').attr('style', 'width:{0}%;'.format(value)));

    return p;
}

function CalcDays(name, birth) {
    var dateFormat = 'yyyy년 mm월 d일 ddd요일';

    var birthday = new CDate(birth);
    var today = new CDate(new Date());

    var days = DateDiff('d', birthday, today) + 1;
    var weeks = days / 7;

    var month = 1;
    // 개월 수 계산 : 만(full)으로 계산하고, 그냥 0부터 세자. 
    var tempDate = DateAdd('m', month, birthday);
    while (DateDiff('d', tempDate, today) > 0) {
        month = month + 1;
        tempDate = DateAdd('m', month, birthday);
    }

    $('#months').text('{0}개월 째. (만 {1}개월)'.format(month, month - 1));

    $('#name').text(name);
    $('#birth').text(Format(birthday, dateFormat));
    var today = new CDate(new Date());
    $('#today').text(Format(today, dateFormat));
    $('#days').text('{0}일 (태어난 날부터 1일로 계산)'.format(days));
    $('#weeks').text('{0}주차'.format(weeks.toFixed(1)));

    var data = [
        [$('#1h'), DateAdd('d',  99, birthday)],
        [$('#2h'), DateAdd('d', 199, birthday)],
        [$('#3h'), DateAdd('d', 299, birthday)],
        [$('#1b'), DateAdd('yyyy', 1, birthday)],
    ];

    for (i in data) {
        var day_target = data[i][1];
        var dom = data[i][0];

        dom.empty();

        var date = Format(day_target, dateFormat);
        var day_until = DateDiff('d', today, day_target) + 1;

        if (day_until > 0) {
            var day_total = DateDiff('d', birthday, day_target);
            var p = CreateProgress((days / day_total * 100).toFixed(0));
            dom.append(
                $('<li>').append(p)
                );
            dom.parent().parent().addClass('success');
        }
        else {
            dom.parent().parent().removeClass('success');
        }

        var comment = day_until > 0
            ? day_until + '일 남음.' : -day_until + '일 지남.';

        var text = '{0} : {1}'.format(date, comment);
        dom.append($('<li>', { text: text }));

    }
    
}