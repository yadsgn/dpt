``` yaml
changes:
    - First version of page block
libs:
    base:     0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Слайдер

## Модификаторы

### size
```jhtml
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:slider width="200px" m:size="S"></b:slider>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:slider width="200px"></b:slider>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:slider m:size="L" width="200px"></b:slider>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```

### mode

#### offset
По умолчанию.

```jhtml
<b:slider width="200px"></b:slider>
```

#### interval
```jhtml
<b:slider m:mode="interval" width="200px"></b:slider>
```

#### fromto
```jhtml
<b:slider m:mode="fromto" width="200px"></b:slider>
```
