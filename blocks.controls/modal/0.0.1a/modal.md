```yaml
changes: 
	- First version of the controls.modal
libs:
	wiki: 1.0.0a
    controls: 
    layouts: 
```

# Модальное окно

```jhtml
<b:modal>
    <e:trigger>
        <b:button>Настроить 1</b:button>
    </e:trigger>
    <l:g m:padding="L" m:gap-x="M" m:gap-y="M" m="nobr">
        <l:r>
            <l:c m="min">Имя</l:c>
            <l:c>
                <b:input m="max" width="250px"></b:input>
            </l:c>
        </l:r>
        <l:r>
            <l:c m="min">Размер груди</l:c>
            <l:c>
                <b:radiogroup>
                    <item m:state="check">1</item>
                    <item>2</item>
                    <item>3</item>
                    <item>4</item>
                </b:radiogroup>
            </l:c>
        </l:r>
        <l:r>
            <l:c colspan="2" m:gap="XS">
                <l:b>
                    <b:check>Присылать угрозы на почту</b:check>
                </l:b>
                <l:b>
                    <b:check>Завещаю внутренние органы Анклаву</b:check>
                </l:b>
                <l:b>
                    <b:check m:state="check">Установить Яндекс.Бар</b:check>
                </l:b>
            </l:c>
        </l:r>
    </l:g>
</b:modal>
```

## Параметры

### title
 Автоматически добавляет поля в 20px

```jhtml
<b:modal title="Смелей, детка">
    <trigger>
        <b:button>Настроить 2</b:button>
    </trigger>
    <l:g m:gap-x="M" m:gap-y="M" m="nobr">
        <l:r>
            <l:c m="min">Имя</l:c>
            <l:c>
                <b:input m="max" width="250px"></b:input>
            </l:c>
        </l:r>
        <l:r>
            <l:c m="min">Размер груди</l:c>
            <l:c>
                <b:radiogroup>
                    <item m:state="check">1</item>
                    <item>2</item>
                    <item>3</item>
                    <item>4</item>
                </b:radiogroup>
            </l:c>
        </l:r>
        <l:r>
            <l:c colspan="2" m:gap="XS">
                <l:b>
                    <b:check>Присылать угрозы на почту</b:check>
                </l:b>
                <l:b>
                    <b:check>Завещаю внутренние органы Анклаву</b:check>
                </l:b>
                <l:b>
                    <b:check m:state="check">Установить Яндекс.Бар</b:check>
                </l:b>
            </l:c>
        </l:r>
    </l:g>
</b:modal>
```

## Элементы

### triger

Элемент вызывающий показ модального окна.

### close

Иногда нельзя позволять человеку просто закрыть модальное окно без уточнения, что именно он этим закрытием хотел сказать: например, вернуть как было или применить новые уставки.
Модальное окно закрывается только помеченными «modal__close» блоками.

```jhtml
<b:modal title="Смелей, детка">
    <trigger>
        <b:button>Настроить 3</b:button>
    </trigger>
    <l:g m:gap-x="M" m:gap-y="M" m="nobr">
        <l:r>
            <l:c m="min">Имя</l:c>
            <l:c>
                <b:input m="max" width="250px"></b:input>
            </l:c>
        </l:r>
        <l:r>
            <l:c m="min">Размер груди</l:c>
            <l:c>
                <b:radiogroup>
                    <item m:state="check">1</item>
                    <item>2</item>
                    <item>3</item>
                    <item>4</item>
                </b:radiogroup>
            </l:c>
        </l:r>
        <l:r>
            <l:c colspan="2" m:gap="XS">
                <l:b>
                    <b:check>Присылать угрозы на почту</b:check>
                </l:b>
                <l:b>
                    <b:check>Завещаю внутренние органы Анклаву</b:check>
                </l:b>
                <l:b>
                    <b:check m:state="check">Установить Яндекс.Бар</b:check>
                </l:b>
            </l:c>
        </l:r>
        <l:r>
            <l:g m="max">
                <l:c>
                    <b:button mix="modal__close">Отмена</b:button>
                </l:c>
                <l:c m="right">
                    <b:button mix="modal__close" m:type="action">Сохранить</b:button>
                </l:c>
            </l:g>
        </l:r>
    </l:g>
</b:modal>
```
