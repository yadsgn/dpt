```yaml
changes: 
	- First version of the controls.textarea
libs:
	wiki: 1.0.0a
```

# Текстовая область

```jhtml
<b:textarea hint="Введи в меня">Ну вот и приехали.</b:textarea>
```

## Состояния
- focus: фокус по нажатию или переходу клавишей tab
- hover: отклик на mouseover
- empty: пустое
- filled: с текстом и крестиком для удаления содержимого

```jhtml
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:textarea rows="2"></b:textarea>
        </l:w-c>
        <l:w-c>empty</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:textarea rows="2" hint="Введи в меня">Наполнена</b:textarea>
        </l:w-c>
        <l:w-c>filled</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:textarea m:hover rows="2"></b:textarea>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:textarea m:focus rows="2"></b:textarea>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

## Модификаторы
### size
Меняет размер текста и отступы. 

```jhtml
<b:textarea m:size="M">Размер M, используется по умолчанию.</b:textarea>
```

```jhtml
<b:textarea m:size="L">А это размер L</b:textarea>
```

### type
#### normal

```jhtml_min-transparent
<b:textarea>Тема по умолчанию.<b:textarea>
```

## Параметры

### hint
Серая подсказка. Пропадает только в состоянии `filled`, а не по фокусу.

```jhtml
<b:textarea hint="Введи в меня"></b:textarea>
```

### width
Ширина поля в пикселях.

```jhtml
<b:textarea width="300px" hint="Введи в меня"></b:textarea>
```

### cols
Ширина поля в символах.

```jhtml
<b:textarea cols="7" hint="Введи в меня"></b:textarea>
```

### rows
Высота поля в строках текста. По умолчанию 3.

```jhtml
<b:textarea rows="1" hint="Введи в меня"></b:textarea>
```
