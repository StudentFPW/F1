import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

/**
 * Функция withRouter — это компонент более высокого порядка, который оборачивает компонент и
 * предоставляет ему доступ к свойствам маршрутизатора, таким как параметры, местоположение и запрос.
 * @returns Функция withRouter возвращает компонент более высокого порядка (HOC), который обертывает
 * WrappedComponent. HOC принимает реквизит и извлекает параметры из хука useParams, местоположение из
 * хука useLocation и поиск из хука location. Затем он создает новый объект URLSearchParams из файла
 * поиска.
 */
const withRouter = WrappedComponent => props => {
    const params = useParams();
    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);

    return (
        <WrappedComponent
            {...props}
            params={params}
            location={location}
            query={query}
        />
    );
};

export default withRouter;