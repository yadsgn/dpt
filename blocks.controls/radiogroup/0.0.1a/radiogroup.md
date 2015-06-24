``` yaml
changes:
    - First version of the block
libs:
    base:     0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Радиогруппа
Группа переключающихся [кнопок](controls.button) с модификатором `mode_check`.

## Модификаторы

### type
Наследуется от кнопки.

#### normal
По умолчанию

```jhtml_min
<b:radiogroup>
    <item m:state="check">Раз</item>
    <item>Два</item>
    <item>Три</item>
</b:radiogroup>
```

#### pseudo
```jhtml_min-transparent
<b:radiogroup m:type="pseudo">
    <item m:state="check">Раз</item>
    <item>Два</item>
    <item>Три</item>
</b:radiogroup>
```

### size
Размер радиогруппы.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:radiogroup m:size="S">
                <item m:state="check">Раз</item>
                <item>Два</item>
                <item>Три</item>
            </b:radiogroup>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:radiogroup m:size="M">
                <item m:state="check">Раз</item>
                <item>Два</item>
                <item>Три</item>
            </b:radiogroup>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:radiogroup m:size="L">
                <item m:state="check">Раз</item>
                <item>Два</item>
                <item>Три</item>
            </b:radiogroup>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:radiogroup m:size="head">
                <item m:state="check">Раз</item>
                <item>Два</item>
                <item>Три</item>
            </b:radiogroup>
        </l:w-c>
        <l:w-c>head (исключительно для шапки)</l:w-c>
    </l:w-r>
</l:w-g>
```

### mode
Режим работы.
```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:radiogroup>
                <item m:state="check">Раз</item>
                <item>Два</item>
                <item>Три</item>
            </b:radiogroup>
        </l:w-c>
        <l:w-c>radio (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:radiogroup m:mode="check">
                <item m:state="check">Раз</item>
                <item m:state="check">Два</item>
                <item>Три</item>
            </b:radiogroup>
        </l:w-c>
        <l:w-c>check</l:w-c>
    </l:w-r>
</l:w-g>
```

### max-width
Равномерное заполнение контейнера

```jhtml_min
<l:w-b width="300">
<b:radiogroup m:max-width>
    <item m:state="check">Раз</item>
    <item>Два</item>
    <item>Три</item>
</b:radiogroup>
</l:w-b>
```

### justify
Кнопки принимают ширину максимальной в группе

```jhtml_min
<l:w-b width="300">
<b:radiogroup m:justify>
    <item m:state="check">Раз два</item>
    <item>3</item>
    <item>4</item>
</b:radiogroup>
</l:w-b>
```

### disable

```jhtml_min
<b:radiogroup m:disable>
    <item m:state="check">Раз</item>
    <item>Два</item>
    <item>Три</item>
</b:radiogroup>
```