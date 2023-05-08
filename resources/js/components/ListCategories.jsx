import {FormContainer, Select} from "@/components/Form";
import {translate} from "@/languages/translate";

const ListCategoriesSelect = ({ sub_categories, categories, errors, data, setData }) => {
  return (
    <>
      <Select
        label={translate('category')}
        items={categories.map(cat => {
          return { value: cat.id, text: cat.name + ' #' + cat.id }
        })}
        handleChange={ e => setData('category', e.target.value) }
        error={errors.category}
      />

      {sub_categories.filter(sub => sub.category == data.category).length > 0 ? (
        <Select
          label={translate('sub-categories')}
          items={sub_categories.filter(sub => sub.category == data.category).map(sub => {
            return { value: sub.id, text: sub.name + ' #' + sub.id }
          })}
          handleChange={ e => setData('sub_category', e.target.value) }
          error={errors.category}
        />
      ) : (
        <div className="alert alert-sm alert-warning">
          {translate('no-sub-categories-paragraph')}
        </div>
      )}
    </>
  )
}

export default ListCategoriesSelect
