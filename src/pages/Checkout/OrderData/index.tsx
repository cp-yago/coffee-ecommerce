import { useForm } from "react-hook-form";
import { Container, Input, Row, PaymentTypeContainer, PaymentTypeCard } from "./styles"
import { BiMap } from 'react-icons/bi'
import { TfiMoney } from 'react-icons/tfi'
import { BsCreditCard2Back } from 'react-icons/bs'
import { Card } from "../../../components";
import { yupResolver } from '@hookform/resolvers/yup';
import { addressInfoSchema } from "./schema";
import { useEffect } from "react";
import { useCartContext } from "../../../contexts/CartContext";


export const OrderData = () => {
  const { onSubmit } = useCartContext()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(addressInfoSchema)
  });

  useEffect(() => {
    console.log('debug errors', errors)
  }, [errors])

  return (
    <Container>
      <h1 className="section-title">Complete seu pedido</h1>
      <Card>
        <div className="sub-title">
          <BiMap />
          <h1>Endereço de entrega</h1>
        </div>
        <p>Informe o endereço onde deseja receber seu pedido</p>

        <form id="addressForm" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Input
              type="text"
              placeholder="CEP"
              error={!!errors['zipCode']}
              {...register("zipCode")}
            />
          </Row>
          <Row>
            <Input type="text" placeholder="Rua" {...register("street")} width={'100%'} error={!!errors['street']} />
          </Row>
          <Row>
            <Input type="text" placeholder="Número" {...register("number")} width={'40%'} error={!!errors['number']} />
            <Input type="text" placeholder="Complemento" {...register("additionalInfo")} width={'60%'} error={!!errors['additionalInfo']} />
          </Row>
          <Input type="text" placeholder="Bairo" {...register("neighborhood")} width={'40%'} error={!!errors['neighborhood']} />
          <Input type="text" placeholder="Cidade" {...register("city")} width={'40%'} error={!!errors['city']} />
          <Input type="text" placeholder="UF" {...register("state")} width={'10%'} error={!!errors['state']} />
        </form>

        {
          !!errors && (
            <p className="error-message">Por favor, insira todos os campos obrigatórios!</p>
          )
        }

      </Card>
      <Card>
        <div className="sub-title">
          <TfiMoney />
          <h1>Pagamento</h1>
        </div>
        <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>

        <PaymentTypeContainer>
          <PaymentTypeCard>
            <BsCreditCard2Back />
            Cartão de crédito
          </PaymentTypeCard>

          <PaymentTypeCard>
            <BsCreditCard2Back />
            Cartão de débito
          </PaymentTypeCard>

          <PaymentTypeCard>
            <BsCreditCard2Back />
            Dinheiro
          </PaymentTypeCard>
        </PaymentTypeContainer>

      </Card>
    </Container>
  )
}