``` yaml
changes:
    - First version of page block
libs:
    wiki: 1.0.0a
    controls:   0.0.1a
```

# Кнопка

```jhtml_min
<l:w-b m:gap-x="L">
    <b:button>Кнопка</b:button>
    <b:button m:mode="check" m:state="check">Кнопка</b:button>
    <b:button m:mode="next">Кнопка</b:button>
    <b:button m:type="action">Кнопка</b:button>
</l:w-b>
```

Центральный элемент среди всех контролов — на его основе составляются все прочие. Здесь под кнопкой подразумевается больше форма, чем смысл. По смыслу кнопка может лишь нажиматься. А с точки зрения формы это абстрактный прямоугольник, который может принимать разные цвета и формы внутри себя.

## Состояния

Каждый тип кнопки может по-своему иллюстрировать состояния:

- release: отжатая кнопка
- hover: отклик на mouseover
- press: вжатость кнопки по mousedown/touchstart; пропадает по mouseup/mouseout/touchend
- check: активное состояние
- hover-check: тот же hover, но тоже для активной кнопки
- press-check: тот же press, но для активной кнопки
- focus: фокус на кнопке по клавише tab
- focus-check: фокус на активной кнопке

## Модификаторы

### type
Основной модификатор. Определяет тип кнопки, который может влиять на состояния и прочие модификаторы.

```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button>Кнопка</b:button>
        </l:w-c>
        <l:w-c>normal</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action">Кнопка</b:button>
        </l:w-c>
        <l:w-c>action</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo">Кнопка</b:button>
        </l:w-c>
        <l:w-c>pseudo</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow">Кнопка</b:button>
        </l:w-c>
        <l:w-c>shadow</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action-shadow">Кнопка</b:button>
        </l:w-c>
        <l:w-c>action-shadow</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg"></b:button>
        </l:w-c>
        <l:w-c>clear</l:w-c>
    </l:w-r>
</l:w-g>
```

#### normal
По умолчанию. Используется во всех случаях, кроме нижеперечисленных.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button>Кнопка</b:button>
        </l:w-c>
        <l:w-c>release</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:state="press">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:state="check">Кнопка</b:button>
        </l:w-c>
        <l:w-c>check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:state="check" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:state="presscheck">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:state="check" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus-check</l:w-c>
    </l:w-r>
</l:w-g>
```

#### action
Акцидентная. В формах для заполнения — submit. На панели — основное действие.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:type="action">Кнопка</b:button>
        </l:w-c>
        <l:w-c>release</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action" m:state="press">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

#### pseudo
Прозрачная. Пригодится для небелого фона для уменьшения акцента на элементе.

```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo">Кнопка</b:button>
        </l:w-c>
        <l:w-c>release</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:state="press">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:state="check">Кнопка</b:button>
        </l:w-c>
        <l:w-c>check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:state="check" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:state="presscheck">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="pseudo" m:state="check" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus-check</l:w-c>
    </l:w-r>
</l:w-g>
```

#### clear
Невидимая. Активный элемент со всеми признаками кнопки, но без видимых границ. Как правило, границы в интерфейсе не нужны иконкам.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg"></b:button>
        </l:w-c>
        <l:w-c>release</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:hover></b:button>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:state="press"></b:button>
        </l:w-c>
        <l:w-c>press</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:state="check"></b:button>
        </l:w-c>
        <l:w-c>check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:state="check" m:hover></b:button>
        </l:w-c>
        <l:w-c>hover-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:state="presscheck"></b:button>
        </l:w-c>
        <l:w-c>press-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:focus></b:button>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="clear" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg" m:state="check" m:focus></b:button>
        </l:w-c>
        <l:w-c>focus-check</l:w-c>
    </l:w-r>
</l:w-g>
```

#### shadow
С тенью. Чтобы обособиться от сложного фона: картинка, карта, фотография и пр.

```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow">Кнопка</b:button>
        </l:w-c>
        <l:w-c>release</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:state="press">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:state="check">Кнопка</b:button>
        </l:w-c>
        <l:w-c>check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:state="check" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:state="presscheck">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press-check</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="shadow" m:state="check" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus-check</l:w-c>
    </l:w-r>
</l:w-g>
```

#### action-shadow
С акцидентная тенью.

```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:type="action-shadow">Кнопка</b:button>
        </l:w-c>
        <l:w-c>release</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action-shadow" m:hover>Кнопка</b:button>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action-shadow" m:state="press">Кнопка</b:button>
        </l:w-c>
        <l:w-c>press</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:type="action-shadow" m:focus>Кнопка</b:button>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

### size
Размер кнопки.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:size="S">Кнопка</b:button>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:size="M">Кнопка</b:button>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:size="L">Кнопка</b:button>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:size="head">Кнопка</b:button>
        </l:w-c>
        <l:w-c>head (исключительно для шапки)</l:w-c>
    </l:w-r>
</l:w-g>
```

### mode
Режим работы кнопки.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button>Кнопка</b:button>
        </l:w-c>
        <l:w-c>button (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:mode="check">Кнопка</b:button>
        </l:w-c>
        <l:w-c>check — западающая</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:mode="next">Кнопка</b:button>
        </l:w-c>
        <l:w-c>next</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:mode="back">Кнопка</b:button>
        </l:w-c>
        <l:w-c>back</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:mode="dropdown">Кнопка</b:button>
        </l:w-c>
        <l:w-c>dropdown</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:mode="close">Кнопка</b:button>
        </l:w-c>
        <l:w-c>close</l:w-c>
    </l:w-r>
</l:w-g>
```

### pin
Спиливание углов и границ для составления сложных монолитных комбинаций.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c m:min>
            <b:button m:pin="clear-round">Кнопка</b:button>
        </l:w-c>
        <l:w-c>clear-round</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:pin="round-clear">Кнопка</b:button>
        </l:w-c>
        <l:w-c>round-clear</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:pin="clear-clear">Кнопка</b:button>
        </l:w-c>
        <l:w-c>clear-clear</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:pin="brick-round">Кнопка</b:button>
        </l:w-c>
        <l:w-c>brick-round</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:pin="round-brick">Кнопка</b:button>
        </l:w-c>
        <l:w-c>round-brick</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:pin="brick-brick">Кнопка</b:button>
        </l:w-c>
        <l:w-c>brick-brick</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-s></l:w-s>
    </l:w-r>
    <l:w-r>
        <b:button m:pin="round-clear">−</b:button>
        <b:input hint="Ширина" width="100"></b:input>
        <b:button m:pin="clear-round">+</b:button>
    </l:w-r>
    <l:w-r>
        <b:input hint="Откуда" width="150"></b:input>
        <b:button m:pin="clear-clear">⇆</b:button>
        <b:input hint="Куда" width="150" m:pin="right"></b:input>
        <b:button m:pin="clear-round" m:type="action">Найти</b:button>
    </l:w-r>
</l:w-g>
```

### max-width
Кнопка по ширине контейнера.
```jhtml_min
<l:w-b width="300">
    <b:button m:max-width>Кнопка</b:button>
</l:w-b>
```

### shape
Форма границ.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:button m:size="head" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg"></b:button>
        </l:w-c>
        <l:w-c>rectangle (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:button m:size="head" m:shape="circle" icon="http://jing.yandex-team.ru/files/kovchiy/filter-5678.svg"></b:button>
        </l:w-c>
        <l:w-c>circle</l:w-c>
    </l:w-r>
</l:w-g>
```

### disable
Заблокированная кнопка. Action-кнопка выглядит так же. Состояние check чуточку темнее.
```jhtml_min
<b:button m:disable>Кнопка</b:button>
<l:w-br></l:w-br>
<l:w-br></l:w-br>
<b:button m:disable m:state="check">Кнопка</b:button>
```
