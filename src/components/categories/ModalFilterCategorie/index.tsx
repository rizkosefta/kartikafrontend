import React from 'react'
import { getAllCategories } from '@/components/categories/actions';
import { TCategory } from '@/components/categories/types';
import { getAllCities } from '@/components/cities/actions';
import { TCity } from '@/components/cities/types';
import FormFilterCategories from './form';

type Props = {
    categorySlug: string;
}

async function ModalFilterCategorie({categorySlug}: Props) {

    const { data: categories}: { data: TCategory[] } = await getAllCategories();


    return <FormFilterCategories categorySlug={categorySlug} categories={categories} />
}

export default ModalFilterCategorie;