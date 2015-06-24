``` yaml
changes:
    - First version of page block
libs:
    base:     0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Поиск
Поисквая строка, элемент [шапки сервиса](portal.head). По сути комбинация [инпута](controls.input), [кнопки](controls.button) и [саджеста](controls.suggest).

```jhtml_min
<b:search></b:search>
```

## Модификаторы

### m:action
```jhtml_min
<b:search m:action></b:search>
```

### m:shadow
```jhtml_min-transparent
<b:search m:shadow m:action></b:search>
```

### m:autofocus
Автоматический фокус в поисковое поле при загрузке страницы.

## Параметры
### width
В пикселях.

```jhtml_min
<b:search width="300"></b:search>
```