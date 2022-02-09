import './App.css'
import { connect } from 'react-redux'
import {
  simpleAction,
  getItems,
  ageDemographic,
} from './Redux/Actions/simpleAction'
import React, { useEffect, useState } from 'react'
import {
  Container,
  makeStyles,
  Box,
  FormControl,
  Grid,
  FormLabel,
} from '@material-ui/core'

import 'bootstrap/dist/css/bootstrap.min.css'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  formHolder: {
    margin: '10px auto',
    border: '1px #ccc solid',
    maxWidth: '800px',
    position: 'relative',
    borderRadius: '3px',
  },

  formTitle: {
    background: '#444444',
    padding: '5px 15px',
    '& h2': {
      margin: '0px',
      lineHeight: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      color: '#fff',
    },
  },

  formHolderInner: {
    padding: '5px 15px',
  },

  formLabelText: {
    fontSize: '0.9rem',
    color: '#444',
  },

  loadingHolder: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    background: '#00000063',

    justifyContent: 'center',
    alignItems: 'center',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '95%',
    border: '1px #ccc solid',
    padding: '0px 5px 0px 0px ',
    borderRadius: '3px',
    marginLeft: '0px',
    background: '#fff',
  },
  formControlInput: {
    width: '100%',
    fontSize: '1rem',
    border: 0,
    padding: '5px 15px',
    background: '#fff',
    '&:focus': {
      outline: 'none',
    },
  },
  MuiAccordionDetails: {
    display: 'block',
  },
}))

function App({
  simpleAction,
  users,
  getItems,
  items,
  ageDemographic,
  usersWith,
  loading,
}) {
  const [selectedItem, setSelectedItem] = useState('-1')
  const [selectedCategoryIndx, setSelectedCategoryIndx] = useState('-2')

  const classes = useStyles()
  const [data, setData] = useState(usersWith)

  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  useEffect(() => {
    setData(usersWith)
  }, [usersWith])
  useEffect(() => {
    simpleAction()
  }, [simpleAction, getItems])
  useEffect(() => {
    if (selectedItem === '0') alert('Please select Item')
    else if (selectedItem !== '0' && selectedItem !== '-1') {
      ageDemographic(selectedItem)
    }
  }, [selectedItem])
  useEffect(() => {
    if (selectedCategoryIndx === '-1') {
      setData(usersWith)
      setSelectedSubCategory('')
    } else {
      if (usersWith[selectedCategoryIndx]) {
        setSubCategories(usersWith[selectedCategoryIndx].subCategories)
        setSelectedSubCategory('')
        setData([usersWith[selectedCategoryIndx]])
      }
    }
  }, [selectedCategoryIndx])
  return (
    <div className="App">
      <Container maxWidth="md">
        <Box className={classes.formHolder} boxShadow={1}>
          <Grid container className={classes.formTitle}>
            <Grid xs={12}>
              <h2>Find Category</h2>
            </Grid>
          </Grid>

          <Box className={classes.formHolderInner}>
            <Grid container>
              <Grid xs={12}>
                <FormLabel className={classes.formLabelText}>
                  Character
                </FormLabel>
                <FormControl variant="filled" className={classes.formControl}>
                  <select
                    className={classes.formControlInput}
                    onChange={(e) => setSelectedItem(e.currentTarget.value)}
                  >
                    <option value="0">Destination</option>
                    {users.length > 0 &&
                      users.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                  </select>
                </FormControl>
              </Grid>
              {usersWith && usersWith.length > 0 && (
                <Grid xs={12}>
                  <FormLabel className={classes.formLabelText}>
                    Category
                  </FormLabel>
                  <FormControl variant="filled" className={classes.formControl}>
                    <select
                      className={classes.formControlInput}
                      onChange={(e) =>
                        setSelectedCategoryIndx(e.currentTarget.value)
                      }
                    >
                      <option value="-1">Category</option>
                      {usersWith.length > 0 &&
                        usersWith.map((i, indx) => (
                          <option key={i.categoryName} value={indx}>
                            {i.categoryName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>
              )}

              {usersWith && usersWith.length > 0 && (
                <Grid xs={12}>
                  <FormLabel className={classes.formLabelText}>
                    Sub Category
                  </FormLabel>
                  <FormControl variant="filled" className={classes.formControl}>
                    <select
                      className={classes.formControlInput}
                      onChange={(e) =>
                        setSelectedSubCategory(e.currentTarget.value)
                      }
                    >
                      <option value="">Sub Category</option>
                      {subCategories.length > 0 &&
                        subCategories.map((i) => (
                          <option
                            key={i.subCategoryName}
                            value={i.subCategoryName}
                          >
                            {i.subCategoryName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>
              )}
            </Grid>

            <div>
              {data &&
                data.length > 0 &&
                data.map((i) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={`panel1a-${i.categoryName}`}
                      >
                        <Typography>{i.categoryName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {selectedSubCategory === ''
                          ? i.subCategories.map((sc) => {
                              return (
                                <Grid xs={12}>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel2a-content"
                                      id="panel2a-header"
                                    >
                                      <Typography>
                                        {sc.subCategoryName}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      className={classes.MuiAccordionDetails}
                                    >
                                      {sc.excursions.map((ex) => {
                                        return <p>{ex.excursionName}</p>
                                      })}
                                    </AccordionDetails>
                                  </Accordion>
                                  <br />
                                </Grid>
                              )
                            })
                          : i.subCategories
                              .filter(
                                (ess) =>
                                  ess.subCategoryName === selectedSubCategory
                              )
                              .map((sc) => {
                                return (
                                  <Grid xs={12}>
                                    <Accordion>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                      >
                                        <Typography>
                                          {sc.subCategoryName}
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails
                                        className={classes.MuiAccordionDetails}
                                      >
                                        {sc.excursions.map((ex) => {
                                          return <p>{ex.excursionName}</p>
                                        })}
                                      </AccordionDetails>
                                    </Accordion>
                                    <br />
                                  </Grid>
                                )
                              })}
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
            </div>

            {/*   {loading === true && (
              <div className={classes.loadingHolder}>
                <CircularProgress color="#fff" />
              </div>
            )} */}
          </Box>
        </Box>
      </Container>
    </div>
  )
}
const mapStateToProps = (state) => ({
  users: state.simpleReducer.users,
  items: state.simpleReducer.items,
  usersWith: state.simpleReducer.usersWith,
  loading: state.simpleReducer.loading,
})
const mapDispatchToProps = (dispatch) => ({
  simpleAction: () => dispatch(simpleAction()),
  getItems: () => dispatch(getItems()),
  ageDemographic: (item) => dispatch(ageDemographic(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
