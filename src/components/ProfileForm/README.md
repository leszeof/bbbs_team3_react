# ProfileForm

Компонент используется на странице Profile (Личный кабинет).

### Пропсы:
- **data** - object, данные дневника для режима редактирования с полями id, date, place, description, mark, image
- **sectionClass** - string, класс-миксин для секций 
- **isEditMode** - boolean, флаг, что форма должна работать в режиме редактирования 
- **isOpen** - boolean, флаг, что форма открыта
- **onClose** - function, функция-коллбэк закрытия формы
- **onSubmit** - function, функция-коллбэк подтверждения отправки формы
