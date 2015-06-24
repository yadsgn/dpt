``` yaml
changes:
    - First version of page block
libs:
    base:     0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Селект
Комбинация [кнопки](controls.button), [попапа](controls.popup) и [меню](controls.menu).

## Модификаторы

### type
#### normal
```jhtml_min
<b:select>
    <item m:state="check">Нож охотничий</item>
    <item>Топор</item>
    <item>Металическая линейка</item>
    <item>Вилка</item>
    <item>Зубная щетка</item>
</b:select>
```

#### pseudo
```jhtml_transparent
<b:select m:type="pseudo">
    <item m:state="check">Нож охотничий</item>
    <item>Топор</item>
    <item>Металическая линейка</item>
    <item>Вилка</item>
    <item>Зубная щетка</item>
</b:select>
```

### size
```jhtml
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:select m:size="S">
                <item m:state="check">Нож охотничий</item>
                <item>Топор</item>
                <item>Металическая линейка</item>
                <item>Вилка</item>
                <item>Зубная щетка</item>
            </b:select>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:select m:size="M">
                <item m:state="check">Нож охотничий</item>
                <item>Топор</item>
                <item>Металическая линейка</item>
                <item>Вилка</item>
                <item>Зубная щетка</item>
            </b:select>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:select m:size="L">
                <item m:state="check">Нож охотничий</item>
                <item>Топор</item>
                <item>Металическая линейка</item>
                <item>Вилка</item>
                <item>Зубная щетка</item>
            </b:select>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```


### title
#### independent
```jhtml
<b:select width="150" title="Язык" m:mode="check" m:title="independent">
    <item short="рус">Русский</item>
    <item short="анг">Английский</item>
    <item short="нем">Немецкий</item>
    <item short="укр">Украинский</item>
    <item short="бел">Белорусский</item>
    <item short="тат">Татарский</item>
    <item short="каз">Казахский</item>
</b:select>
```

#### depends
```jhtml
<b:select width="150px" title="Любой язык" m:mode="check">
    <item short="рус">Русский</item>
    <item short="анг">Английский</item>
    <item short="нем">Немецкий</item>
    <item short="укр">Украинский</item>
    <item short="бел">Белорусский</item>
    <item short="тат">Татарский</item>
    <item short="каз">Казахский</item>
</b:select>
```

### mode

#### radio
```jhtml
<b:select>
    <group title="Наиболее вероятное">
        <item m:state="check">Нож охотничий</item>
        <item>Топор</item>
        <item>Металическая линейка</item>
    </group>
    <group title="Наименее">
        <item>Вилка</item>
        <item>Зубная щетка</item>
    </group>
</b:select>
```

#### check
```jhtml
<b:select m:mode="radiocheck" title="Время">
    <item>За сутки</item>
    <item>За две недели</item>
    <item>За месяц</item>
</b:select>
```

#### radiocheck
```jhtml
<b:select m:mode="check">
    <group title="Наиболее вероятное">
        <item m:state="check">Нож охотничий</item>
        <item m:state="check">Топор</item>
        <item>Металическая линейка</item>
    </group>
    <group title="Наименее">
        <item>Вилка</item>
        <item>Зубная щетка</item>
    </group>
</b:select>
```

### width

#### fixed
```jhtml
<b:select>
    <group title="Наиболее вероятное">
        <item m:state="check">Нож охотничий</item>
        <item>Топор</item>
        <item>Металическая линейка</item>
    </group>
    <group title="Наименее">
        <item>Вилка</item>
        <item>Зубная щетка</item>
    </group>
</b:select>
```

#### float
```jhtml
<b:select m:width="float">
    <group title="Наиболее вероятное">
        <item m:state="check">Нож охотничий</item>
        <item>Топор</item>
        <item>Металическая линейка</item>
    </group>
    <group title="Наименее">
        <item>Вилка</item>
        <item>Зубная щетка</item>
    </group>
</b:select>
```

### icon

#### visible
```jhtml
<b:select>
    <group title="Наиболее вероятное">
        <item m:state="check" icon="/assets/icons/controls/select/download_16.svg">Нож охотничий</item>
        <item icon="/assets/icons/controls/select/print_16.svg">Топор</item>
        <item icon="/assets/icons/controls/select/play_16.svg">Металическая линейка</item>
    </group>
    <group title="Наименее">
        <item icon="/assets/icons/controls/select/camera_16.svg">Вилка</item>
        <item icon="/assets/icons/controls/select/trash_16.svg">Зубная щетка</item>
    </group>
</b:select>
```

#### invisible
```jhtml
<b:select m:hide-icons="yes">
    <group title="Наиболее вероятное">
        <item m:state="check" icon="/assets/icons/controls/select/download_16.svg">Нож охотничий</item>
        <item icon="/assets/icons/controls/select/print_16.svg">Топор</item>
        <item icon="/assets/icons/controls/select/play_16.svg">Металическая линейка</item>
    </group>
    <group title="Наименее">
        <item icon="/assets/icons/controls/select/camera_16.svg">Вилка</item>
        <item icon="/assets/icons/controls/select/trash_16.svg">Зубная щетка</item>
    </group>
</b:select>
```
