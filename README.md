# venbest-udp-tt

Необходимо создать систему, которая будет контролировать связь с 1000ю сетевых устройств. Пусть скрипт "trni.js" будет одним из "1000чи устройств", связь с которыми нужно контролировать, а скрипт "rcv.js" это ПО которое будет мониторить связь, а в случае ее отсутствия - сообщать об этом в консоль.

Задание:

1. Используя Node.js создать скрипт "trn1.js" который будет 10 раз в минуту отправлять на сетевой слот (hostname = 'localhost', port = 2222) "ФИО" человека используя UDP протокол.
2. Создать скрипт "rcv.js", который будет "слушать" порт и сможет обнаружить что более одной минуты скрипт "trni.js" не работал.
3. В случае отсутствия связи с скриптом - вывести в консоль сообщение "нет связи с скриптом "trni.js""
4. Обеспечить поддержку одновременной работы нескольких скриптов "trni.js" с различными "ФИО"

В результате выполнения задания вы должны передать нам два файла: "trn1.js" и "rcv.js". Проверяющая сторона может запустить несколько копий "trni.js" с различными именами. Со всеми этими копиями необходимо мониторить канал связи.
