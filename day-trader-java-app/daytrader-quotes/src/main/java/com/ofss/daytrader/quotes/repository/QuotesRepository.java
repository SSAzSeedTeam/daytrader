package com.ofss.daytrader.quotes.repository;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ofss.daytrader.entities.QuoteDataBean;

@Repository
public interface QuotesRepository extends JpaRepository<QuoteDataBean, String>{
	
	
	@Query(value="select * from quoteejb q where q.symbol like 's:1__' order by q.change1", nativeQuery = true)
	public Collection<QuoteDataBean> fetchQuotesBySymbol();
	
	@Query(value="select * from quoteejb q where q.symbol like 's:1__' order by q.change1 DESC", nativeQuery = true)
	public Collection<QuoteDataBean> fetchQuotesBySymbolDESC();
	
	@Query(value="select SUM(price)/count(*) as TSIA from quoteejb q where q.symbol like 's:1__'", nativeQuery = true)
	public BigDecimal getTSIA();
	
	@Query(value="select SUM(open1)/count(*) as openTSIA from quoteejb q where q.symbol like 's:1__'", nativeQuery = true)
	public BigDecimal getOpenTSIA();
	
	@Query(value="select SUM(volume) as totalVolume from quoteejb q where q.symbol like 's:1__'", nativeQuery = true)
	public double getTSIATotalVolume();
	
	@Query(value="select count(symbol) as tradeStockCount from quoteejb a where a.symbol like 's:%'", nativeQuery = true)
	public int countSymbol();
	
	@Query(value ="select * from quoteejb q where q.symbol=?1 For Update", nativeQuery = true)
	public QuoteDataBean getQuoteForUpdate(String symbol);
	
	@Modifying
	@Query(value="update quoteejb set price = ?1, change1 = ?1 - open1, volume = ?2 where symbol = ?3", nativeQuery = true)
	public void updateQuotePriceVolume(BigDecimal price, double volume, String symbol);

}
