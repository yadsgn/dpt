```yaml
changes:
    - First version of the controls.popup
libs:
    wiki: 1.0.0a
    controls:
    layouts:
```

# Всплывающее окно

```jhtml
<b:popup m:show="bottom-left">
    <e:trigger>
        <b:link m="minor">Условия передачи данных</b:link>
    </e:trigger>
    <l:b m:padding="M" width="250px">Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.</l:b>
</b:popup>

```

## Элементы
### trigger

Элемент вызывающий попап. По умолчанию берется блок идущий перед попапом.
<!--- Также может быть задан через атрибут - trigger. -->

```jhtml
<b:popup>
    <e:trigger>
        <b:button>Условия передачи данных </b:button>
    </e:trigger>
    <l:b m:padding="M" width="250px">Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.</l:b>
</b:popup>
```

### tail

Всегда есть у подсказок и опционален для всего остального.

```jhtml
<b:popup m:tail>
    <e:trigger>
        <b:button>Условия передачи с хвостиком </b:button>
    </e:trigger>
    <l:b m:padding="M" width="250px">Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.</l:b>
</b:popup>
```

###  text, content

В попапе может показываться простой текст.

```jhtml
<b:popup trigger=".link_trigger">
    <trigger>
        <b:link>Условия</b:link>
    </trigger>        
    <text>Нормик</text>    
</b:popup>
```

А может и составной контент.
```jhtml
<b:popup m:show="top-left">
    <trigger>
        <b:button m:mode="dropup">Параметры</b:button>
    </trigger>
    <content>
        <b:menu m:mode="check">
          <group title="Кнопки">
                <item m:state="check">Приложить</item>
                <item>Оформление</item>
                <item m:state="check">Перевод</item>
                <item>Орфография</item>
            </group>
            <group title="Поля">
                <item>Копия</item>
                <item>Скрытая копия</item>
                <item>Выбор отправителя</item>
            </group>
            <group title="Для этого письма">
                <item>Уведомить о получении</item>
                <item>Напомнить о неответе через 5 дней</item>
                <item>Отправить по времени</item>
            </group>
        </b:menu>
    <content>    
</b:popup>
```

## Модификаторы
### show

Направление раскрытия всплывающего окна. По умолчанию `bottom-center`.

```jhtml
<l:g m:gap="S">
    <l:r>
        <l:c/>
        <l:c>
        top-left
        </l:c>
        <l:c align="center">
            top-center
        </l:c>
        <l:c align="right">
            top-right
        </l:c>
        <l:c/>
    </l:r>
    <l:r>
        <l:c align="right">
            left-top
        </l:c>
        <l:c colspan="3" rowspan="3" m="center middle" style="border:1px solid #CCC">trigger</l:c>
        <l:c>
            right-top
        </l:c>
    </l:r>
    <l:r>
        <l:c align="right">
            left-center
        </l:c>
        <l:c>
            right-center
        </l:c>
    </l:r>
    <l:r>
        <l:c align="right">
            left-bottom
        </l:c>
        <l:c>
            right-bottom
        </l:c>
    </l:r>
    <l:r>
        <l:c/>
        <l:c>
            bottom-left
        </l:c>
        <l:c align="center">
            bottom-center
        </l:c>
        <l:c align="right">
            bottom-right
        </l:c>
        <l:c/>
    </l:r>
</l:g>
```

```jhtml
<l:w-g m:gap-y="L" m:gap-x="L">
    <l:w-r>
        <l:w-c>right-center</l:w-c>
        <l:w-c>
            <b:input m:size="S" width="150px" hint="Ваш телефон"></b:input>
            <b:popup m:show="right-center" m:type="help" m:size="S">С семеркой желательно</b:popup>
        </l:w-c>        
    </l:w-r>
    <l:w-r>
        <l:w-c>bottom-center</l:w-c>        
        <l:w-c>
            <b:popup m:show="bottom-center">
                <trigger>
                    <b:link m="minor">Условия передачи данных</b:link>
                </trigger>
                <l:b m:padding="M" width="250px">Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.</l:b>
            </b:popup>
        </l:w-c>        
    </l:w-r>
</l:w-g>
```

### auto-close

Попап скроется после клика по нему, по умолчанию он этого не делает.
```jhtml
<b:popup m:show="bottom-center" m:auto-close="yes">
    <trigger>
        <b:link m="minor">Условия передачи данных</b:link>
    </trigger>
    <l:b m:padding="M" width="250px">Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.</l:b>
</b:popup>
```
### mode

По умолчанию `click`.

#### click & hover

```jhtml
<l:g m:gap="M">
    <l:r>
        <l:c>
            <b:button>click</b:button>
            <b:popup m:mode="click">
                <l:b m:padding="M" width="250px">
                    Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.
                </l:b>
            </b:popup>
        </l:c>
        <l:c>
            <b:button>hover</b:button>
            <b:popup m:mode="hover">
                <l:b m:padding="M" width="250px">
                    Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или анкеты, содержащих мои персональные данные, и согласен со всем.
                </l:b>
            </b:popup>
        </l:c>
    </l:r>
</l:g>
```

#### tip

Покажется, не дожидаясь действий пользователя.

```jhtml
<b:link>mercy</b:link>
<b:popup m:mode="tip">
    No mercy, it's SPARTA!1
</b:popup>
```

#### hold

```jhtml
<b:link>It feels so right now</b:link>
<b:popup m:mode="hold">
    Hold me tight!
</b:popup>
```

### size

По умолчанию `M`.

```jhtml
<l:g m:gap="M">
    <l:r>
        <l:c>
            <b:button m:size="s">S</b:button>
            <b:popup m:size="s">
                Мал
            </b:popup>
        </l:c>
        <l:c>
            <b:button m:size="m">M</b:button>
            <b:popup m:size="m">
                Дa
            </b:popup>
        </l:c>
        <l:c>
            <b:button m:size="l">L</b:button>
            <b:popup m:size="l">
                Дa
            </b:popup>
        </l:c>
        <l:c>
            <b:button m:size="xl">Grand</b:button>
            <b:popup m:size="grand">
                Удал
            </b:popup>
        </l:c>
    </l:r>
</l:b>
```

### type

Итерфейсы Яндекса приемущественно белые, поэтому подсказки темные или яркие, чтобы быть немного не отсюда и обращать на себя внимание.

Мы плохого не посоветуем, поэтому, по клик на подсказку равен клику на указываемый элемент. Подсказки скрываются без побочных эффектов кликом в свободную область.

#### normal, ok, help & error

```jhtml
<l:g m:gap="M">
    <l:r>
        <l:c>normal</l:c>
        <l:c>
            <b:popup m:show="top-center">
                <trigger>
                    <b:link m="minor">Условия передачи данных</b:link>
                </trigger>
                <text>Помнишь меня?</text>
            </b:popup>        
        </l:c>
    </l:r>
    <l:r>
        <l:c>help</l:c>
        <l:c>
            <b:input m:size="S" width="150px" hint="Ваш телефон"></b:input>
            <b:popup m:show="right-center" m:type="help" m:size="S">С семеркой желательно</b:popup>
        </l:c>
    </l:r>
    <l:r>
        <l:c>error</l:c>
        <l:c>
            <b:input width="150px" hint="Ваш телефон"></b:input>
            <b:popup m:show="right-center" m:type="error" m:force="yes">Я бы не стал</b:popup>        
        </l:c>
    </l:r>
    <l:r>
        <l:c>ok</l:c>
        <l:c>
            <b:input m:size="L" width="150px" hint="Ваш телефон"></b:input>
            <b:popup m:show="right-center" m:type="ok" m:size="L">Можно верить</b:popup>
        </l:c>
    </l:r>
</l:g>
```

### force

Регулирует степень приставучести попапа, с ним подсказка не сбрасывается кликом в пустое место.


## Параметры

### offset

Отступ от тригера. По умолчанию составляет 8 пикселей.

```jhtml_max
<l:b m:padding="M">
    <b:link >Привет</b:link>
    <b:popup offset="120" m:show="right-center">
        Незабудка
    </b:popup>
</l:b>
```

### align-offset

Смещение в пикселях относительно оси показа всплывающего окна.

```jhtml
<l:b m:padding="M" height="50">
<b:link >Привет</b:link>
<b:popup align-offset="40" m:show="right-center">
    Незабудка
</b:popup>
</l:b>
```

<!---
### trigger

Тоже что и элемент trigger. Задается как селектор для jQuery.
Например:
```
<b:link m:trigger>line</b:link>
<b:popup trigger=".link_trigger">!!!</b:popup>
```

### show-on, hide-on
Управление показом и скрытием для сложных тригерров. Оба параметра должны быть использованы вместе.

Формат: jQuery селектор, cобытие.
Например: ``show-on=".link_hello mouseover"``


```jhtml
<b:block width="100" height="50">
    <b:link m:hello>Привет</b:link>
     - - - 
    <b:link m:bye>Пока</b:link>
</b:block>
<b:popup show-on=".link_hello mouseover" hide-on=".link_bye mouseover">
    Незабудка
</b:popup>
```
-->

